var mortgage = angular.module('mortgage', [ 'chart.js' ]);

mortgage.filter('numberRu', function() {
	return function(n) {
		var num = parseInt(n, 10);
		if (isNaN(num)) {
			return "-";
		}
		var rounded = num;
		if (num > 1000) {
			rounded = round(num, 100);
		}

		var ret = rounded.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
		if (rounded <= 0) {
			ret = "(" + ret + ")";
		}
		return ret;

	};
});

mortgage.filter('years', function() {
	return function(val) {

		var re = val % 10;

		if (re > 4 || (val >= 10 && val <= 20) || val == 0) {
			return val + " лет"
		} else {
			if (re === 1) {
				return val + " год"
			} else {
				return val + " года"
			}
		}
	};
});

mortgage.controller('mortgageController',
		function($scope, $timeout) {

			var scope = $scope;

			scope.curr = " руб.";
			scope.appt = {
				value : 6500000,
				rental : 28000,
				inflation : 5
			};

			scope.appt.loan = {
				firstPayment : 1900000,
				interrest : 13.5,
				years : 15,
				insurance : scope.appt.value * 0.0015,
				service : scope.appt.value * 0.001
			};

			scope.deposit = {
				interest : 10
			};

			scope.loanCalculated = {};

			/**
			 * chart
			 */
			{
				$scope.series = [ 'долг', 'баланс', 'стоимость квартиры' ];
				$scope.rentalSeries = [ 'депозит', 'траты на аренду', 'баланс' ];
				$scope.chartLabels = [];
				$scope.chartData = [ [], [], [] ];
				$scope.rentalChartData = [ [], [], [] ];
				$scope.onClick = function(points, evt) {
					console.log(points, evt);
				};

				$scope.chartOptions = {
					tooltipCornerRadius : 0,
					animationEasing : "easeOutQuart",
					animationSteps : 15,
					tooltipTitleFontStyle : 'normal',
					scaleShowLabels : false,
					pointDotRadius : 3,
					pointDotStrokeWidth : 1,
					tooltipFontFamily : "Roboto",
					tooltipTitleFontFamily : 'Roboto' // tooltipTemplate
				// : "<%=
				// value
				// %><%if
				// (label){%>:<%=label%><%}%>",

				};
			}

			scope.updateChartData = function() {
				if (scope.updateChartDataPromise) {
					return;
					// $timeout.cancel(scope.updateChartDataPromise);
					// scope.updateChartDataPromise = null;
				}

				scope.updateChartDataPromise = $timeout(function() {
					scope.updateChartDataInt();
					scope.updateChartDataPromise = null;
				}, 500);

			}

			$scope.updateChartDataInt = function() {
				var appt = scope.appt;
				if (!appt || !appt.loan) {
					return;
				}

				var chartData = scope.chartData;
				var chatLabels = scope.chatLabels;
				var rentalChartData = scope.rentalChartData;

				var loan = scope.appt.loan;

				var p = scope.montlyPayment();
				// scope.loanCalculated.monthlyPayment = p;

				if (!chartData || chartData[0].length != loan.years) {
					chartData = [ [], [], [] ];
					rentalChartData = [ [], [], [] ];
					chartLabels = [];

					scope.chartData = chartData;
					scope.chartLabels = chartLabels;
					scope.rentalChartData = rentalChartData;
				}

				var depositSumm = loan.firstPayment;
				var rentalCostsSumm = 0;

				for (var y = 0; y <= loan.years; y++) {
					chartLabels[y] = y + " ";

					var remainingLoanBalance = scope.remainingLoanBalance(12 * y);
					chartData[0][y] = round(remainingLoanBalance, 1000);

					var serviceCosts = integrateInflatedAmount(loan.service, y * 12, appt.inflation / 1200);
					var insuranceCosts = integrateInflatedAmount(appt.loan.insurance, y, appt.inflation / 100)
					var apptFV = inflate(appt.value, appt.inflation / 100, y);

					/* appt FV - summ of payments */

					var overpayments = integrateMonthlyInterrest(0, y * 12, scope.loanCalculated.body,
							loan.interrest / 100, loan.years);
					if (y == 0) {
						overpayments = 0;
					}
					chartData[1][y] = round(apptFV - overpayments - serviceCosts - insuranceCosts
							- remainingLoanBalance, 500);
					chartData[2][y] = round(apptFV, 500);

					/**
					 * 
					 */
					var rental = inflate(appt.rental, appt.inflation / 100, y);

					var inflatedServiceFee = inflateMonth(loan.service, appt.inflation / 100, y * 12);

					// rentalChartData[0][y] = rental;
					for (var m = 0; m < 12; m++) {
						var month = y * 12 + m;

						var delta = scope.loanCalculated.monthlyPayment + inflatedServiceFee - rental;

						depositSumm = depositSumm + delta;
						if (month > 0) {
							depositSumm += depositSumm * (scope.deposit.interest / 1200);
						}
						rentalCostsSumm += rental;
					}

					rentalChartData[0][y] = round(depositSumm, 500);
					rentalChartData[1][y] = round(rentalCostsSumm, 500);
					rentalChartData[2][y] = round(depositSumm - rentalCostsSumm, 500);

					// scope.futureValue(appt.value);

				}

				// scope.loanCalculated.loanYears = ret;
				// scope.loanCalculated.body = appt.value - loan.firstPayment;
				// scope.loanCalculated.overpayment = scope.summOfAllPayments()
				// - scope.loanCalculated.body;
				// scope.loanCalculated.mothlyCosts =
				// scope.loanCalculated.monthlyPayment + appt.loan.service
				// + appt.loan.insurance / 12;
			}

			$scope.$watch('appt.loan.firstPayment', function(newValue, oldValue) {
				scope.deposit.principal = round(scope.appt.loan.firstPayment, 500);
			});

			scope.futureValue = function(amount) {
				return inflate(amount, scope.appt.inflation / 100, scope.appt.loan.years);
			}

			$scope.totalRentalCost = function() {
				var appt = $scope.appt;
				return integrateInflatedAmount(appt.rental * 12, appt.loan.years, appt.inflation / 100);
			}

			$scope.totalServiceCost = function() {
				var appt = $scope.appt;
				return integrateInflatedAmount(appt.loan.service, appt.loan.years * 12, appt.inflation / 1200);
			}

			$scope.totalInsuranceCost = function() {
				var appt = $scope.appt;
				return integrateInflatedAmount(appt.loan.insurance, appt.loan.years, appt.inflation / 100);
			}

			$scope.deltaBalance = function() {
				return Math.abs(scope.rentalBalance() - scope.mortgageBalance());
			}

			/**
			 * @deprecated
			 */
			$scope.overpayment = function(month) {
				var loan = $scope.appt.loan;
				var remainingLoanBalance = $scope.remainingLoanBalance(month);

				var rate = loan.interrest / 1200;
				var overpayment = remainingLoanBalance * rate;
				return overpayment;
			}

			$scope.totalOverpayment = function(month) {
				var sum = 0;
				for (var a = 0; a < month; a++) {
					sum = sum + $scope.overpayment(a + 1);
				}
				return sum;
			}

			$scope.summOfAllPayments = function() {
				var appt = $scope.appt;
				return $scope.montlyPayment() * appt.loan.years * 12;
			}

			$scope.mortgageBalance = function() {
				return scope.futureValue(scope.appt.value) - scope.loanCalculated.overpayment
						- scope.totalServiceCost() - scope.totalInsuranceCost();
			}

			$scope.rentalBalance = function() {
				return scope.getCompoundInterest() - scope.totalRentalCost();
			}

			$scope.remainingLoanBalance = function(months) {
				var loan = $scope.appt.loan;
				var principal = $scope.appt.value - loan.firstPayment;
				return remainingLoanBalance(months, principal, loan.interrest / 100, loan.years);
			}

			$scope.montlyPayment = function() {
				var loan = $scope.appt.loan;
				var loanBody = $scope.appt.value - loan.firstPayment;
				return monthlyPayment(loanBody, loan.interrest / 100, loan.years);
			}

			$scope.$watchCollection('appt.loan', function(newValue, oldValue) {
				// console.log(newValue);
				scope.recalculateLoan();
			});

			/**
			 * XXX: remove this watch, monthlyDeposit not needed
			 */
			$scope.$watch('appt.rental', function() {
				scope.calcDeposit();
			});

			$scope.$watch('appt.inflation', function() {
				scope.calcDeposit();
			});
			/**
			 * XXX: remove this watch, monthlyDeposit not needed
			 */
			$scope.$watch('loanCalculated.monthlyPayment', function() {
				scope.calcDeposit();
			});

			$scope.$watch('appt.value', function(newValue, oldValue) {
				// console.log(newValue);
				scope.recalculateLoan();
			});

			scope.calcDeposit = function() {
				// XXX:
				var appt = scope.appt;
				var loan = scope.appt.loan;
				var totalAddon = 0;
				var sum = loan.firstPayment;

				// var chartData = scope.chartData;
				// if (!chartData || chartData[0].length != loan.years) {
				// rentalChartData = [ [], [] ];
				// scope.rentalChartData = rentalChartData;
				// }

				// ----
				for (var y = 0; y < loan.years; y++) {
					var rental = inflateMonth(appt.rental, appt.inflation / 100, y * 12);
					var inflatedServiceFee = inflateMonth(loan.service, appt.inflation / 100, y * 12);

					// rentalChartData[0][y] = rental;
					for (var m = 0; m < 12; m++) {
						var month = y * 12 + m;

						var delta = scope.loanCalculated.monthlyPayment + inflatedServiceFee - rental;
						// if (delta < 0) {
						// delta = 0;// XXX negative delta is ok
						// }
						// console.log("m=" + month + " inflatedServiceFee=" +
						// inflatedServiceFee);
						totalAddon += delta;
						sum = sum + delta;
						if (month > 0) {
							sum = sum + sum * (scope.deposit.interest / 1200);
						}
					}
				}

				scope.deposit.monthlyDeposit = totalAddon / (loan.years * 12);
				// console.log("sum=" + sum);
				// console.log("mean addon=" + totalAddon / (loan.years * 12));
				$scope.updateChartData();
				return sum;
			}

			scope.recalculateLoan = function() {
				var appt = scope.appt;
				if (!appt || !appt.loan) {
					return;
				}

				var loan = scope.appt.loan;
				var ret = new Array();

				var p = scope.montlyPayment();
				scope.loanCalculated.monthlyPayment = p;

				for (var y = 1; y <= loan.years; y++) {
					var adta = {
						yearNo : y,
						balance : $scope.remainingLoanBalance(12 * y),
						paid : p * 12 * y
					}
					ret.push(adta);
				}

				scope.loanCalculated.loanYears = ret;
				scope.loanCalculated.body = appt.value - loan.firstPayment;
				scope.loanCalculated.overpayment = scope.summOfAllPayments() - scope.loanCalculated.body;
				scope.loanCalculated.mothlyCosts = scope.loanCalculated.monthlyPayment + appt.loan.service
						+ appt.loan.insurance / 12;

				$scope.updateChartData();
			}

			scope.getCompoundInterest = function() {

				// XXX: add;
				return scope.calcDeposit();

				// var loan = $scope.appt.loan;
				// return getCompoundInterest(scope.deposit.principal,
				// scope.deposit.interest / 100, 12, loan.years,
				// scope.deposit.monthlyDeposit);
			};

			scope.getCompoundInterestIncome = function() {

				var loan = $scope.appt.loan;
				return scope.getCompoundInterest() - $scope.deposit.principal - $scope.deposit.monthlyDeposit * 12
						* loan.years;
			};

			scope.restoreData = function() {

			};

			scope.restoreData();

		});
