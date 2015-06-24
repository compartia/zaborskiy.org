/**
 * see https://en.wikipedia.org/wiki/Compound_interest
 */
function getCompoundInterest(principal, interestRate, numberOfTimesInterestCompoundedPerYear, years, monthlyPayment) {

	var mothlyInterest = interestRate / numberOfTimesInterestCompoundedPerYear;

	var d = Math.pow((1 + mothlyInterest), numberOfTimesInterestCompoundedPerYear * years);

	var s = principal * d;

	var futureValueOfSeries = monthlyPayment * ((d - 1) / (mothlyInterest))

	return s + futureValueOfSeries;
}

function round(amount, step) {
	return step * Math.round(amount / step);
}

function inflate(amount, inflation, years) {
	return amount * Math.pow(1 + inflation, years);
}

function inflateMonth(amount, inflation, month) {
	return amount * Math.pow(1 + inflation / 12, month);
}

function integrateInflatedAmount(amount, periods, rate) {
	var sum = 0;
	for (y = 0; y < periods; y++) {
		var v = inflate(amount, rate, y);
		sum += v;
	}
	return sum;
}

function monthlyPayment(principal, interestRate, years) {
	var months = 12 * years;
	var rate = interestRate / 12;

	var d = Math.pow(1 + rate, months);
	var payment = (rate + (rate / (d - 1))) * principal;
	return payment;
}

function remainingLoanBalance(afterMonth, principal, interestRate, years) {
	if (afterMonth > years * 12) {
		return 0;
	}

	var rate = interestRate / 12;
	var payment = monthlyPayment(principal, interestRate, years);
	var d = Math.pow(1 + rate, afterMonth);
	var balance = principal * (d) - ((payment / rate) * (d - 1));
	return balance;
}