const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

//network definition
const network = bitcoin.networks.testnet;


//HD's wallet address derivation
const path =  `m/49'/1'/0'/0`;

//generate mnemonic words to seed(password)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

//root of hd wallet
let root = bip32.fromSeed(seed, network)

//create account - pvt and pub keys
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Wallet generated!");
console.log(`Addresss: ${btcAddress}`);
console.log(`PVT Key: ${node.toWIF()}`);
console.log(`Seed ${mnemonic}`);

