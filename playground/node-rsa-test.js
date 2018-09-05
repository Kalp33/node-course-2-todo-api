var fs = require('fs');
var generatePublicKey = require('rsa-pem-from-mod-exp');
var sha256 = require('sha256');
var crypto = require('crypto');

var modulus = '7+eHRlHVL5+exMX7QiMtloVz7iqUmftpRFQ+yvb43KD+fCdVgmSRf3CBV8mNZIJeAFvGfo5R4/rWjg4bNskUUyHQxIVgOfwt6RrczqelBikFHkXoYefd05jMSsLCIHPlkIP9y+eIX94XHA+X0JSMKd4Dq9l4g8EFBSo+6DvCYog30Z3HAsfo/hYoxWXqCFOeP3nLh9KDCNpPFpvjcfAVkH88It6MuFZkwP5P7bKrdfRXZM5XjnIqJ7UA3/QmJefVImTrMTFz91W+8Kcc0pkPNyQAUC/w8SwTpv7sxqRR336S7GJ9fk1vUIwZwjHaCL+LC/ZpOdUnJjgG/LNyaCc7SQ==';
var exponent = 'AQAB';

console.log("============================================================");
var license = fs.readFileSync('./LOCAL_LICENSE');
var macAddress = "0A0027000010";

var publicKey = generatePublicKey(modulus, exponent);

var verifier = crypto.createVerify('sha256');
verifier.update(macAddress);
var ver = verifier.verify(publicKey, license,'base64');
console.log(ver);


console.log("============================================================");
