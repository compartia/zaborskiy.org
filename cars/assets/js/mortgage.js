var mortgage = angular.module('mortgage', []);

mortgage.filter('numberRu', function() {
	return function(n) {
		var num = parseInt(n, 10);
		if (isNaN(num)) {
			return "-";
		}
		var rounded = num;
		if (num > 1000) {
			rounded = Math.round(num / 100);
			rounded = rounded * 100;
		}
		return rounded.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');

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
		function($scope) {

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

			$scope.$watch('appt.loan.firstPayment', function(newValue, oldValue) {
				scope.deposit.principal = round(scope.appt.loan.firstPayment, 500);
			});

			scope.futureValue = function(amount) {
				return inflate(amount, scope.appt.inflation / 100, scope.appt.loan.years);
			}

			scope.let = function(val) {
				if (val % 10 < 5) {
					return val + " года"

				} else {
					return val + " let"

				}
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

			$scope.overpayment = function(month) {
				var loan = $scope.appt.loan;
				var remainingLoanBalance = $scope.remainingLoanBalance(month);

				var rate = loan.interrest / 1200;
				var overpayment = remainingLoanBalance * rate;
				return overpayment;
			}

			$scope.totalOverpayment = function(month) {
				var sum = 0;
				for (a = 0; a < month; a++) {
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
				var sum = 1;// scope.appt.loan.principal;
				for (month = 0; month < loan.years * 12; month++) {
					var rental = inflateMonth(appt.rental, appt.inflation / 100, month - month % 12);
					var inflatedServiceFee = inflateMonth(loan.service, appt.inflation / 100, month - month % 12);
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

				scope.deposit.monthlyDeposit = totalAddon / (loan.years * 12);
				// console.log("sum=" + sum);
				// console.log("mean addon=" + totalAddon / (loan.years * 12));
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

				for (y = 1; y <= loan.years; y++) {
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
