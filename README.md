## Simple BlockChain

A simple blockchain project [written in Javascript (ES6) + Node] that demonstrates some of the concepts behind a blockchain:

-   Generating Wallet Addresses
-   Proof-Of-Work
-   Nonces and Hashing
-   Validating Transaction Balances
-   Mining Blocks
-   Miners' Reward
-   Miner's Fee In A Transaction

**Note:** This project is for simple demonstration purposes only, and is not meant to be used as a base for your own blockchain projects. It is missing many other significant features of a blockchain such as validating the transactions' authenticity (i.e. signature with private-public keys), tampering protection and security against bad nodes, chain conflicts and longest chain selection, invalid transactions expiry, choosing the highest paying transactions (i.e. filtering based on the miner's fee), the Peer-To-Peer (P2P) network and querying for the longest chain, etc...

---

To install, simply clone this repo and run the following commands:

```
npm install
npm run sample
```