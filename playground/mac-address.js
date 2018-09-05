const fs = require('fs');
const getmac = require('macaddress');
const signature = require('./signature-verify');

//var modulus = '7+eHRlHVL5+exMX7QiMtloVz7iqUmftpRFQ+yvb43KD+fCdVgmSRf3CBV8mNZIJeAFvGfo5R4/rWjg4bNskUUyHQxIVgOfwt6RrczqelBikFHkXoYefd05jMSsLCIHPlkIP9y+eIX94XHA+X0JSMKd4Dq9l4g8EFBSo+6DvCYog30Z3HAsfo/hYoxWXqCFOeP3nLh9KDCNpPFpvjcfAVkH88It6MuFZkwP5P7bKrdfRXZM5XjnIqJ7UA3/QmJefVImTrMTFz91W+8Kcc0pkPNyQAUC/w8SwTpv7sxqRR336S7GJ9fk1vUIwZwjHaCL+LC/ZpOdUnJjgG/LNyaCc7SQ==';
//var exponent = 'AQAB';


var macAddresses = getmac.all();
var localLicense = fs.readFileSync('./LOCAL_LICENSE');
var verify = signature.verifySign(macAddresses, localLicense);

console.log('Verified:', verify);
