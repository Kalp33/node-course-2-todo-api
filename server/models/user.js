const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value)
            },
            message : 'Not a valid email '
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    var user = this;
    var UserObject = user.toObject();

    return _.pick(UserObject, ['email', '_id']);
}

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, '123abc').toString();
    user.tokens = user.tokens.concat([{access, token}]);
    return user.save().then(() => {
        return token;
    });
}

UserSchema.statics.findBytoken = function(token) {
    var User = this;
    var decoded;

    try{
        decoded = jwt.verify(token, '123abc');
    }catch(e){
        return new Promise((resolve, reject) => {
           reject();
        });
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });


};

UserSchema.statics.findByCredentials = function(email, password){
    var User = this;

    return User.findOne({email}).then((user) => {
       if(!user){
           return Promise.reject();
       }

       return new Promise((resolve, reject) => {
           bcrypt.compare(password, user.password, (err, res) => {
               if(!res){
                   reject();
               }
               resolve(user);
           });
       });
    });
};

UserSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    }else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User:User
}