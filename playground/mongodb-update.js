//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server. ');

    //findOneAndUpdate
    /*db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5b7ba3f36d96702b8c88fee7')},
        {
            $set: {
                completed: true
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
    });*/

    db.collection('Users').findOneAndUpdate({_id: new ObjectID('5b7b96f300027e11487b9c69')}
        ,{
            $set: {
                name: 'KK'
            },
            $inc: {
                age: 1
            }
        },{
            returnOriginal: false
        }).then((result) => {
            console.log(result);
    });

    //db.close();
});