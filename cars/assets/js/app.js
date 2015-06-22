function makeDefaultCar() {

	var car = {};

	car.value = 1000000;
	car.reduction = 35;

	car.loan = {
		use : true,
		years : 4,
		interrest : 19.5,
		firstPayment : 300000
	};

	car.osago = 12000;
	car.casco = 95000;
	car.washAnnual = 12000;
	car.parkingAnnual = 2500;
	car.service = 17000;
	car.tax = 7600;
	car.misc = 3000;
	car.tyres = 10000;

	car.fuel = {
		price : 36,
		consumption : 10,
		dailyDistance : 35
	};

	if (car.loan.use) {
		car.loan.firstPayment = car.value * 0.3;
	} else {
		car.loan.firstPayment = car.value;
	}
	return car;
}

var cars = angular.module('cars', []);

cars.filter('numberFixedLen', function() {
	return function(n, len) {
		var num = parseInt(n, 10);
		len = parseInt(len, 10);
		if (isNaN(num) || isNaN(len)) {
			return n;
		}
		num = '' + num;
		while (num.length < len) {
			num = '0' + num;
		}
		return num;
	};
});

cars.filter('numberRu', function() {
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

cars.controller('carsController', function($scope) {

	var scope = $scope;

	scope.years = 3;
	scope.curr = " руб.";
	scope.averageSpeed = 24;

	$scope.resetData = function() {
		scope.car = makeDefaultCar();

	}

	$scope.toJSON = function() {
		var json_str = JSON.stringify($scope.car);
		return json_str;
	}

	$scope.toURL = function() {
		return document.location.protocol + "//" + document.location.hostname + document.location.pathname + "#"
				+ encode64($scope.toJSON());
	}

	$scope.fromURL = function(data) {
		return decode64(data);
	}

	$scope.overpayment = function(month) {
		var loan = $scope.car.loan;
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

	$scope.remainingLoanBalance = function(months) {
		var loan = $scope.car.loan;

		if (months > loan.years * 12) {
			return 0;
		}

		var principal = $scope.car.value - loan.firstPayment;

		var rate = loan.interrest / 1200;
		var payment = $scope.montlyPayment();
		var d = Math.pow(1 + rate, months);
		var balance = principal * (d) - ((payment / rate) * (d - 1));
		return balance;
	}

	$scope.montlyPayment = function() {
		var loan = $scope.car.loan;

		var rate = loan.interrest / 1200;
		var months = 12 * loan.years;
		var principal = $scope.car.value - loan.firstPayment;

		var d = Math.pow(1 + rate, months);
		var payment = (rate + (rate / (d - 1))) * principal;
		return payment;
	}

	$scope.$watch('car.value', function(newValue, oldValue) {
		var car = $scope.car;
		$scope.car.casco = Math.round(car.value / 12);
	});

	$scope.$watch('car.loan.firstPayment', function(newValue, oldValue) {
		var car = $scope.car;
		$scope.deposit.principal = car.loan.firstPayment;
	});

	$scope.$watchCollection('car.loan', function(newValue, oldValue) {
		console.log(newValue);
		var car = $scope.car;
		if (!car || !car.loan) {
			return;
		}

		var loan = scope.car.loan;
		var ret = new Array();

		var p = $scope.montlyPayment();
		for (y = 1; y <= loan.years; y++) {
			var adta = {
				yearNo : y,
				balance : $scope.remainingLoanBalance(12 * y),
				paid : p * 12 * y
			}
			ret.push(adta);
		}

		$scope.loanYears = ret;
	});

	$scope.getTotal = function() {
		var car = $scope.car;
		if (car) {
			var loanYears = $scope.car.loan.years < $scope.years ? $scope.car.loan.years : $scope.years;
			return $scope.getTotalNoLoan() + $scope.totalOverpayment(12 * loanYears) / $scope.years;
		}
	};

	$scope.getTotalNoLoan = function() {
		var car = $scope.car;
		if (car) {
			return car.osago + car.casco + $scope.annualFuelCost() + car.washAnnual + car.parkingAnnual + car.service
					+ car.tax + car.misc + car.tyres + $scope.annualReduction();
		}
	};

	$scope.residualCost = function() {
		var car = $scope.car;
		if (car) {
			return car.value - car.value * car.reduction / 100;
		}
	};

	$scope.annualReduction = function() {
		var car = $scope.car;
		if (car) {
			return (car.value - $scope.residualCost()) / $scope.years;
		}
	};

	$scope.dailyConsumption = function() {
		var car = $scope.car;
		if (car) {
			return (car.fuel.dailyDistance / 100) * car.fuel.consumption;
		}
	};

	$scope.annualFuelCost = function() {
		var car = $scope.car;
		if (car) {
			return $scope.dailyConsumption() * 30 * 12 * car.fuel.price;
		}
	};

	$scope.makeDeposit = function(car) {
		var deposit = {
			principal : car.loan.firstPayment,
			interest : 7,
			monthlyDeposit : 500 * Math.round($scope.getTotalNoLoan() / (12 * 500))
		}
		return deposit;
	};

	scope.restoreData = function() {

		var d = getDataFromUrl();
		if (!d) {
			d = makeDefaultCar();
		}
		$scope.car = d;
		$scope.deposit = $scope.makeDeposit($scope.car);
	};

	scope.getCompoundInterest = function() {
		return getCompoundInterest(scope.deposit.principal, scope.deposit.interest / 100, 12, scope.years,
				scope.deposit.monthlyDeposit);
	};

	scope.getCompoundInterestIncome = function() {
		return scope.getCompoundInterest() - $scope.deposit.principal - $scope.deposit.monthlyDeposit * 12
				* scope.years;
	};

	scope.restoreData();

});

cars.directive('numberFormat', [ '$filter', '$parse', function($filter, $parse) {
	return {
		require : 'ngModel',
		link : function(scope, element, attrs, ngModelController) {

			ngModelController.$parsers.push(function(data) {
				// Attempt to convert user input into a numeric type to store
				// as the model value (otherwise it will be stored as a string)
				// NOTE: Return undefined to indicate that a parse error has
				// occurred
				// (i.e. bad user input)
				data = data.replace(/\s+/g, '');
				var parsed = parseFloat(data);
				return !isNaN(parsed) ? parsed : undefined;
			});

			ngModelController.$formatters.push(function(data) {
				// convert data from model format to view format
				return $filter('numberRu')(data); // converted
			});

			element.bind('focus', function() {
				element.val(ngModelController.$modelValue);
			});

			element.bind('blur', function() {
				// Apply formatting on the stored model value for display
				var formatted = $filter('numberRu')(ngModelController.$modelValue);
				element.val(formatted);
			});
		}
	}
} ]);