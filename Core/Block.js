var SHA256 = require("crypto-js/sha256");

class Block {
	constructor(transactions, previousHash) {
		this.timestamp = Date.now;
		this.transactions = transactions;
		this.previousHash = previousHash;
		this.nonce = 0;
		this.generateHash();
	}

	generateHash() {
		this.hash = SHA256(
			JSON.stringify(this.transactions) +
				this.timestamp +
				this.previousHash +
				this.nonce
		).toString();
	}
}

module.exports = Block;
