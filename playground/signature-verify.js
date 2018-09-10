const generatePublicKey = require('rsa-pem-from-mod-exp');
const crypto = require('crypto');
//const {modulus, exponent} = require('./../server/config/config');

var modulus = '7+eHRlHVL5+exMX7QiMtloVz7iqUmftpRFQ+yvb43KD+fCdVgmSRf3CBV8mNZIJeAFvGfo5R4/rWjg4bNskUUyHQxIVgOfwt6RrczqelBikFHkXoYefd05jMSsLCIHPlkIP9y+eIX94XHA+X0JSMKd4Dq9l4g8EFBSo+6DvCYog30Z3HAsfo/hYoxWXqCFOeP3nLh9KDCNpPFpvjcfAVkH88It6MuFZkwP5P7bKrdfRXZM5XjnIqJ7UA3/QmJefVImTrMTFz91W+8Kcc0pkPNyQAUC/w8SwTpv7sxqRR336S7GJ9fk1vUIwZwjHaCL+LC/ZpOdUnJjgG/LNyaCc7SQ==';
var exponent = 'AQAB';

function verifySign(macAddresses, signature){
    var publicKey = generatePublicKey(modulus, exponent);
    var verifier = crypto.createVerify('sha256');
    var verify = false;
    for (var index in macAddresses){
        var val = macAddresses[index];
        var mac = val.mac.replace(/:/g,'').toUpperCase();
        verifier.update(mac);
        if(verifier.verify(publicKey, signature,'base64')){
            verify = true;
            break;
        }else {
            throw new Error('Invalid Mac Address');
        }
    }
    return verify;
}

module.exports = {verifySign};
