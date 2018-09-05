var env = process.env.NODE_ENV || 'development';

if(env === 'development'){
    process.env.PORT = 3040;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}else if(env === 'test'){
    process.env.PORT = 3040;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}

var modulus = '7+eHRlHVL5+exMX7QiMtloVz7iqUmftpRFQ+yvb43KD+fCdVgmSRf3CBV8mNZIJeAFvGfo5R4/rWjg4bNskUUyHQxIVgOfwt6RrczqelBikFHkXoYefd05jMSsLCIHPlkIP9y+eIX94XHA+X0JSMKd4Dq9l4g8EFBSo+6DvCYog30Z3HAsfo/hYoxWXqCFOeP3nLh9KDCNpPFpvjcfAVkH88It6MuFZkwP5P7bKrdfRXZM5XjnIqJ7UA3/QmJefVImTrMTFz91W+8Kcc0pkPNyQAUC/w8SwTpv7sxqRR336S7GJ9fk1vUIwZwjHaCL+LC/ZpOdUnJjgG/LNyaCc7SQ==';
var exponent = 'AQAB';

module.exports = {
    modulus,
    exponent
}