const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b7bbbddf7a41d0f8cf603fe';

if(!ObjectID.isValid(id)){
    console.log('Id not valid');
}

/*Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    completed: false
}).then((todo) => {
    console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
    if(!todo){
        return console.log("Id not found");
    }
    console.log('Todo', todo);
}).catch((e) => console.log(e));*/

User.findById(id).then((user) => {
   if(!user){
       return console.log("User does not exist");
   }
   console.log(user);
}).catch((err) => {
    console.log(err);
});