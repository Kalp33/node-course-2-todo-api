const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/*Todo.remove({}).then((result) => {
    console.log(result);
});*/

Todo.findByIdAndRemove('5b7fa596a4b5c616d809393a').then((todo) => {
    console.log(todo);
});