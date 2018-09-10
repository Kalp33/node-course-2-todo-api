const crypto = require('crypto');
const bcrypt = require('bcryptjs');
var pass = ';L3.-n3N\\"9';
var text = 'Kalpesh';
//var text = '7PEwmfDoYN9WL4V7nxn5vQ==';
var salt = 'abc123';

//bcrypt.genSalt(1000, (err, salt) => {
    console.log(salt);
    const key = crypto.pbkdf2Sync(pass, salt, 1000, 64, 'sha1');
    console.log('key', key.toString('hex'));
    var encrypted = encryptData(text, key, 'des-ede');
    console.log('encrypted',encrypted);
    var decrypted = decryptData(encrypted, key, 'des-ede');
    console.log('decrypted',decrypted);

//});

function encryptData(text, key, algorithm){
    var cipher = crypto.createCipher(algorithm, key);
    var result = cipher.update(text, 'utf8', 'hex');
    result += cipher.final('hex');
    return result;
}

function decryptData(encrypted, key, algorithm){
    var decipher = crypto.createDecipher(algorithm,key)
    var dec = decipher.update(encrypted,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}




