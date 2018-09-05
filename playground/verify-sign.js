var RSA = require('node-rsa');
var sha256 = require('sha256');
var crypto = require('crypto')


var key = new RSA({b: 1024});

var privateKey = key.exportKey();
var publicKey = key.exportKey('public');

console.log('privateKey', privateKey);
console.log('publicKey', publicKey);

var macAddress = "7C2A310EB235";


var signer = crypto.createSign('sha256');
signer.update(macAddress);
var sign = signer.sign(privateKey,'base64');

var verifier = crypto.createVerify('sha256');
verifier.update(macAddress);
var ver = verifier.verify(publicKey, sign,'base64');
console.log(ver);

