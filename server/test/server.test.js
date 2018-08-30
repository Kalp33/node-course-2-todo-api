const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');


const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {populateTodos, todos, populateUsers, users} = require('./seed/seed');



beforeEach(populateUsers);
beforeEach(populateTodos);


describe('POST /todos' , () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
    it('should not create a new todo', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find().then((todos) => {
                   expect(todos.length).toBe(2);
                   done();
                }).catch((e) => done(e));
            });
    });
});

    describe('GET /todos', () => {
       it('should get all todos', (done) => {
           request(app)
               .get('/todos')
               .expect(200)
               .expect((res) => {
                   expect(res.body.todos.length).toBe(2);
               })
               .end(done);
       })
    });

    describe('GET /todos/:id', () => {
        it('should return doc', (done) => {
            var hexId = todos[0]._id.toHexString();
            var url = '/todos/' + hexId;
            request(app)
                .get(url)
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo.text).toBe(todos[0].text);
                })
                .end(done);
        });

        it('should return 404 if todo not found', (done) => {
            request(app)
                .get('/todos' + new ObjectID().toHexString())
                .expect(404)
                .end(done);
        });

        it('should return 404 for non-object id', (done) => {
            request(app)
                .get('/todos/123')
                .expect(404)
                .end(done);
        });
    });

    describe('DELETE /todos/:id', () => {
        var id = todos[0]._id.toHexString();
        var url = '/todos/' + id;

        it('should delete todo', (done) => {
            request(app)
                .delete(url)
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo._id).toBe(id);
                })
                .end((err, res) => {
                    if(err){
                        return done(err);
                    }
                    Todo.findById(id).then((todo) => {
                        expect(todo).toBeNull();
                        done();
                    }).catch((e) => done(e));
                });
        });

        it('should return 404 if todo not found', (done) => {
            request(app)
                .delete('/todos' + new ObjectID().toHexString())
                .expect(404)
                .end(done);
        });

        it('should return 404 for non-object id', (done) => {
            request(app)
                .delete('/todos/123')
                .expect(404)
                .end(done);
        });
    });

    describe('PATCH /todos/:id', () => {
       it('should update the todo', (done) => {
           var id = todos[0]._id.toHexString();
           var url = '/todos/' + id;
           var text = 'This should be new text';
           request(app)
               .patch(url)
               .send({
                   completed: true,
                   text
               })
               .expect(200)
               .expect((res) => {
                   expect(res.body.todo.text).toBe(text);
                   expect(res.body.todo.completed).toBe(true);
                   expect(typeof  res.body.todo.completedAt).toBe('number');
               })
               .end(done);
       });

        it('completedAt should be null', (done) => {
            var id = todos[0]._id.toHexString();
            var url = '/todos/' + id;
            var text = 'This should be new text';
            request(app)
                .patch(url)
                .send({
                    completed: false,
                    text
                })
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo.text).toBe(text);
                    expect(res.body.todo.completed).toBe(false);
                    expect(res.body.todo.completedAt).toBeNull();
                })
                .end(done);
        });
    });

describe('POST /users' , () => {
    it('should create a new user', (done) => {
        var email = 'testUser@example.com';
        var password = 'testUserPass';


        var user = {
            email,
            password
        };

        request(app)
            .post('/users')
            .send(user)
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).not.toBeNull();
                expect(res.body._id).not.toBeNull();
                expect(res.body.email).toBe(email);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.find({email}).then((users) => {
                    expect(users).not.toBe({});
                    expect(users.password).not.toBe(password);
                    expect(users.length).toBe(1);
                    expect(users[0].email).toBe(email);
                    done();
                }).catch((e) => done(e));
            });


    });

    it('should not create user if email is not unique', (done) => {
        var email = 'userTwo@example.com';
        var password = 'userThreePass';

        var user = {
            email,
            password
        };

        request(app)
            .post('/users')
            .send(user)
            .expect(400)
            .end((err) => {
                done(err);
            });
    });

    it('should return validation error if request is invalid', (done) => {
        var email = 'testUser';
        var password = 'pass';
        var user = {
            email,
            password
        };
        request(app)
            .post('/users')
            .send(user)
            .expect(400)
            .end(done);
    })


});

describe('GET /users/me', () => {
    it('should return user if authenticated', (done) => {
       request(app)
           .get('/users/me')
           .set('x-auth', users[0].tokens[0].token)
           .expect(200)
           .expect((res) => {
               expect(res.body._id).toBe(users[0]._id.toHexString());
               expect(res.body.email).toBe(users[0].email);
           }).end(done);
    });

    it('should not return user if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /users/login', () => {
    it('should login user and return auth token', (done) => {
        var email = 'userOne@example.com';
        var password = 'userOnePass';

        var user = {email, password};

        request(app)
            .post('/users/login')
            .send(user)
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).not.toBeNull();
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                User.findById(users[0]._id).then((user) => {
                   expect(user.tokens[1].access).toEqual('auth');
                   expect(user.tokens[1].token).toEqual(res.headers['x-auth']);
                   done();
                }).catch((e) => done(e));
            });
    });

    it('should reject invalid login', (done) => {
       var email = 'testUser@example.com';
       var password = 'testPass';
       var user = {
           email,
           password
       };

       request(app)
           .post('/users/login')
           .send(user)
           .expect(400)
           .expect((res) => {
               expect(res.headers['x-auth']).toBeUndefined();
               expect(res.body).toEqual({});
           })
           .end((err, res) => {
               if (err) {
                   return done(err);
               }

               User.findById(users[0]._id).then((user) => {
                   expect(user.tokens.length).toBe(0);
                   done();
               }).catch((e) => done(e));
           });
    });
});
