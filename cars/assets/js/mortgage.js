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

		if (re > 4 || (val >= 10 && val <= 20)) {
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
				value : 5000000,
				rental : 30000,
				inflation : 5
			};

			scope.appt.loan = {
				firstPayment : 800000,
				interrest : 13,
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
				// var sum = 0;
				// for (y = 0; y < appt.loan.years; y++) {
				// var v = 12 * inflate(appt.rental, appt.inflation / 100.0, y);
				// sum += v;
				// }
				// return summ;
				return integrateInflatedAmount(appt.rental, appt.loan.years * 12, appt.inflation / 1200);
			}

			$scope.totalServiceCost = function() {
				var appt = $scope.appt;
				return integrateInflatedAmount(appt.loan.service, appt.loan.years * 12, appt.inflation / 1200);
			}

			$scope.totalInsuranceCost = function() {
				var appt = $scope.appt;
				return integrateInflatedAmount(appt.loan.insurance, appt.loan.years, appt.inflation / 100);
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

			/**
			 * @deprecated
			 */
			$scope.loanAmount = function() {
				var appt = $scope.appt;
				return appt.value - appt.loan.firstPayment;
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
				console.log(newValue);
				scope.recalculateLoan();
			});

			$scope.$watch('appt.rental', function() {
				scope.deposit.monthlyDeposit = round(scope.loanCalculated.monthlyPayment - scope.appt.rental, 500);
			});

			$scope.$watch('appt.value', function(newValue, oldValue) {
				console.log(newValue);
				scope.recalculateLoan();
			});

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
			}

			scope.getCompoundInterest = function() {
				var loan = $scope.appt.loan;
				return getCompoundInterest(scope.deposit.principal, scope.deposit.interest / 100, 12, loan.years,
						scope.deposit.monthlyDeposit);
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
