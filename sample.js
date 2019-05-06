const BlockChain = require("./Core/BlockChain");
const Utility = require("./Core/Utility");

const totalSupply = 1000000;
const genesisAddressBalance = 500;
const difficuly = 4;
const minersReward = 1;

const utility = new Utility();
//utility.getNewWalletAddress();
const genesisAddress = 'genesis';
const minersAddress1 = 'miner';
const minersAddress2 = 'miner2';
const userAddress1 = 'user1';
const userAddress2 = 'user2';
const userAddress3 = 'user3';

var blockChain = new BlockChain(totalSupply, genesisAddress, genesisAddressBalance, difficuly, minersReward);

blockChain.addTransction(genesisAddress, userAddress1, 50, 10);
blockChain.addTransction(genesisAddress, userAddress2, 50);
blockChain.mineBlock(minersAddress1);
blockChain.addTransction(userAddress1, userAddress3, 20, 0.5);
blockChain.addTransction(userAddress2, userAddress3, 25);
blockChain.mineBlock(minersAddress2);
blockChain.addTransction(minersAddress1, genesisAddress, 5);
blockChain.mineBlock(minersAddress2);
blockChain.mineBlock(minersAddress2);

console.log('system: ', blockChain.getBalance('system'));
console.log('genesis: ', blockChain.getBalance(genesisAddress));
console.log('user 1: ', blockChain.getBalance(userAddress1));
console.log('user 2: ', blockChain.getBalance(userAddress2));
console.log('user 3: ', blockChain.getBalance(userAddress3));
console.log('miner 1: ', blockChain.getBalance(minersAddress1));
console.log('miner 2: ', blockChain.getBalance(minersAddress2));