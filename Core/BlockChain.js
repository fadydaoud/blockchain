var Block = require("./Block");
var Transaction = require("./Transaction");

class BlockChain {
	constructor(
        totalSupply,
		genesisAddress,
        genesisAddressBalance,
        difficulty,
        minersReward
	) {
        this.systemAddress = "system";
        this.totalSupply = totalSupply;
        this.minersReward = minersReward;

        this.difficulty = difficulty;
        this.setDifficulty(difficulty);
        
        this.pendingTransactions = [];
		this.chain = [
            this.getGenesisBlock(genesisAddress, genesisAddressBalance)
        ];
	}

	getGenesisBlock(genesisAddress, genesisAddressBalance) {
        if(this.totalSupply <= 0 || genesisAddressBalance > this.totalSupply)
            throw "Total Supply must be greater than 0, and genesis address balance must be less than";

        return new Block(
            [
                new Transaction("", this.systemAddress, this.totalSupply, 0),
                new Transaction(this.systemAddress, genesisAddress, genesisAddressBalance, 0)
            ],
            ""
        );
	}

	setDifficulty(difficulty) {
		this.hashPrefix = new Array(difficulty + 1).join("0");
	}

	mineBlock(minersAddress) {
        if(minersAddress == undefined)
            throw "Unable to mine block without a miner's wallet address";

		const previousHash = this.getPreviousHash();
        const transactions = this.getValidTransactions(minersAddress);
        
		if (!transactions.length) return;

		var block = new Block(transactions, previousHash);

		console.log("Mining New Block...\n");

		while (!block.hash.startsWith(this.hashPrefix)) {
			block.nonce++;
			block.generateHash();
		}

		this.chain.push(block);

		this.pendingTransactions = this.pendingTransactions.filter(function(transaction) {
			return !block.transactions.includes(transaction);
        });
        
        const nonMinerTransactions = block.transactions.filter(function(transaction) {
			return transaction.toAddress != minersAddress;
		});

        if(this.totalSupply > this.minersReward && nonMinerTransactions.length > 0) {
            this.addTransction(
                this.systemAddress,
                minersAddress,
                this.minersReward,
                0
            );

            this.totalSupply -= this.minersReward;
        }

		console.log("Block Mined: " + block.hash + "\n");
		for (const tr of transactions) {
			console.log("Block Transaction: " + JSON.stringify(tr, null, 4) + "\n");
		}

		return block.hash;
	}

	addTransction(fromAddress, toAddress, amount, minersFee = 0) {
		this.pendingTransactions.push(
			new Transaction(fromAddress, toAddress, amount, minersFee)
		);
	}

	getValidTransactions(minersAddress) {
		let tempBalances = [];
		let validTransactions = [];
		const transactions = Object.assign([], this.pendingTransactions);

		for (const transaction of transactions) {
			if (tempBalances[transaction.fromAddress] == undefined)
				tempBalances[transaction.fromAddress] = this.getBalance(transaction.fromAddress);
            
            const amount = transaction.amount + transaction.minersFee;
			if (tempBalances[transaction.fromAddress] >= amount) {
                tempBalances[transaction.fromAddress] -= amount;
                validTransactions.push(transaction);

                if(transaction.minersFee > 0)
                    validTransactions.push(new Transaction(transaction.fromAddress, minersAddress, transaction.minersFee, 0));
			}
		}

		return validTransactions;
	}

	getPreviousHash() {
		return this.chain[this.chain.length - 1].hash;
	}

	getBalance(address) {
		let balance = 0;

		for (const block of this.chain) {
			for (const transaction of block.transactions) {
				if (transaction.toAddress == address)
					balance += transaction.amount;
				else if (transaction.fromAddress == address)
					balance -= transaction.amount;
			}
		}

		return balance;
	}
}

module.exports = BlockChain;
