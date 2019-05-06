class Transaction {
	constructor(fromAddress, toAddress, amount, minersFee = 0) {
		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;
		this.minersFee = minersFee;
		this.tranactionDate = Date.now();
	}
}

module.exports = Transaction;
