class Utility {
	getNewWalletAddress() {
		return (
			Date.now().toString() +
			Math.floor(10000000000000 * Math.random()).toString() // add a random number as the date's milliseconds is not granular enough to be considered unique
		);
	}
}

module.exports = Utility;
