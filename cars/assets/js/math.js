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
