const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

var newTodo = new Todo({
    text: 'Cook dinner'
});

var newTodo2 = new Todo({
    text: 'Read Book',
    completed: true,
    completedAt: 1234
});

/*newTodo.save().then((doc) => {
    console.log('Saved Todo:', doc);
}, (e) => {
    console.log('Unable to save Todo');
});*/

newTodo2.save().then((doc) => {
    console.log('Saved Todo:', doc);
}, (e) => {
    console.log('Unable to save Todo');
});




