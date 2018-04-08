const { INITIAL_BALANCE } = require('./config');
const Wallet = require('./wallet');
const { randomBytes } = require('crypto');
const secp256k1 = require('secp256k1');
const sha256 = require('sha256');
const createKeccakHash = require('keccak')


class Regulator {

    constructor() {
        this.users = 0;// number of users,
        this.INITIAL_BALANCE = INITIAL_BALANCE;
    }


    generate() {
        /*
        *@description
        *Generate wallet
        *Generating algorithm follows ethereum algorithm for signing transactions
        *For more info, visit yellow paper of ethereum: https://ethereum.github.io/yellowpaper/paper.pdf 
        */ 
        this.users += 1;
        
        // Generate private key
        let privKey
        do {
            privKey = randomBytes(32)
        }while (!secp256k1.privateKeyVerify(privKey))
        
        // Derive public key in a compressed format
        let pubKey = secp256k1.publicKeyCreate(privKey)

        let address = createKeccakHash('keccak256').update(pubKey).digest('hex').slice(95,)

        return new Wallet(address, keys.getPrivate(), keys.getPublic(), 0);
    }


    identify(data, signature, publicKey) {
        
        delete data.public_key;
        delete data.signature;
        
        return secp256k1.verify(data, sigObj.signature, publicKey);
    }

    
}

module.exports = Regulator;