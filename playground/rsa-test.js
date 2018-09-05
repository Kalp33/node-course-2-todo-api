var RSA = require('node-rsa');
var sha256 = require('sha256');


var key = new RSA({b: 1024});
//key.setOptions({encryptionScheme: 'pkcs1'});


var privateKey = key.exportKey();
var publicKey = key.exportKey('public');

console.log('privateKey', privateKey);
console.log('publicKey', publicKey);

var macAddress = "7C2A310EB235";

var macHash = sha256(macAddress);

//key.importKey(privateKey, 'pkcs1');

var encryptedMac = key.encryptPrivate(macHash, 'base64');

console.log('macHash-----', macHash);
console.log('encryptedMac', encryptedMac);

key.importKey(publicKey);

var decryptedMac = key.decryptPublic(encryptedMac, 'utf8');

//key.decryptPublic(encryptedMac, 'ascii');
console.log(key.verify(macHash, encryptedMac, 'base64', 'base64'));
//console.log(macHash === decryptedMac);


console.log('decryptedMac', decryptedMac);


