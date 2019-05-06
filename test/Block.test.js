const assert = require("chai").assert;

const Block = require("../Core/Block");
const Transaction = require("../Core/Transaction");

describe("Block", function() {
	describe("Hash", function() {
		const transactions = [new Transaction("address1", "address2", 100)];
		const hash = new Block(transactions, "").hash;

		it("should be a 64 character hash", function() {
			assert.equal(hash.length, 64);
		});

		it("should calculate the correct Hash", function() {
			assert.equal(
				hash,
				"0feb4aded062895b072ef95e3eae47b708535121050d08638bd5e19ef03668d5"
			);
		});
	});
});
