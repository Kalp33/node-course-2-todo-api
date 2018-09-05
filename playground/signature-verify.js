const generatePublicKey = require('rsa-pem-from-mod-exp');
const crypto = require('crypto');
const {modulus, exponent} = require('./../server/config/config');

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

        }
    }
    return verify;
}

module.exports = {verifySign};
