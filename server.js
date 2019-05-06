const BlockChain = require("./Core/BlockChain");
// const Block = require("./Core/Block");
// const Transaction = require("./Core/Transaction");
const Utility = require("./Core/Utility");

const utility = new Utility();
const rootAddress = utility.getNewWalletAddress();
const address1 = utility.getNewWalletAddress();
const address2 = utility.getNewWalletAddress();
const address3 = utility.getNewWalletAddress();

var blockChain = new BlockChain(10000, rootAddress, 1000, 4);

blockChain.addTransction(rootAddress, address1, 50);
blockChain.addTransction(rootAddress, address2, 50);
blockChain.addTransction(address1, address3, 40);
blockChain.addTransction(address2, address3, 10);

//blockChain.mineBlock();
//blockChain.mineBlock();

//---------------------------------------------------------------------------

const express = require("express");
const bodyparser = require("body-parser");
// const websockets = require("ws");
const httpServerPort = 3000;
let walletAddress = "";

var app = express();
app.use(bodyparser.json());

app.get("/", (req, res) => {
	res.redirect("/getWalletAddress");
});

app.get("/getWalletAddress", (req, res) => {
	if (walletAddress == "") walletAddress = utility.getNewWalletAddress();

	res.send(`Your Wallet Address is: ${walletAddress}`);
});

app.get("/getBalance", (req, res) => {
	res.send(
		`Your Current Balance is: ${blockChain.getBalance(walletAddress)}`
	);
});

app.get("/mineBlock", (req, res) => {
	const newHash = blockChain.mineBlock(walletAddress);

	if (newHash != undefined)
		res.send(
			`Mined New Block: ${newHash} </br> Your Balance After Your Reward Is Mined Will Be: ${blockChain.getBalance(
				walletAddress
			) + blockChain.minersReward}`
		);
	else res.send(`No New Transactions To Mine...`);
});

// app.get("/getBlockchain", (req, res) => {
// 	res.send("Retrieved The Latest BlockChain...");
// });

app.listen(httpServerPort, () =>
	console.log(`Server started on port: ${httpServerPort}`)
);
