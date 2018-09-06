var mongodb = require('mongodb');
var Promise = require('promise');

const MongoClient = mongodb.MongoClient, format = require('util').format;
var db;
MongoClient.connect('mongodb://ds113738.mlab.com:13738/todo-grad-project',
  {
    useNewUrlParser: true,
    auth: {
      user: process.env.DB_USR,
      password: process.env.DB_PSSWD
    }
  }, (err, client) => {
  console.log('Connecting to DB client');
  if(err) {
      console.log('Failed to connect to DB', err);
      return;
  }
  db = client.db('todo-grad-project');
  console.log('DB client connected');
});

module.exports.add = (todo) => {
  return new Promise((resolve, reject) => {
    db.collection('todos').insertOne({
      title: todo.title,
      isComplete: todo.isComplete
    }, (err, todo) => {
      if(err) {
        reject({
          code: 500,
          msg: err
        });
      } else {
        resolve(todo);
      }
    });
  });
}

module.exports.getAllTodos = () => {
  return new Promise((resolve, reject) => {
    db.collection('todos').find().toArray((err, todoDocs) => {
      if(err) {
        reject({
          code: 500,
          msg: err
        });
      }
      resolve(todoDocs.map((item, index) => {
        return {
          id: index,
          title: item.title,
          isComplete: item.isComplete
        }
      }));
    });
  });
}
