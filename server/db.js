var mongodb = require('mongodb');
var Promise = require('promise');

const MongoClient = mongodb.MongoClient, format = require('util').format;
var collection;

module.exports.connect = () => {
  MongoClient.connect('mongodb://ds113738.mlab.com:13738/todo-grad-project', {
      useNewUrlParser: true,
      auth: {
        user: process.env.DB_USR,
        password: process.env.DB_PSSWD
      }
    }, (err, client) => {
    console.log('Connecting to DB client');
    if (err) {
        console.log('Failed to connect to DB', err);
        return;
    }
    collection = client.db('todo-grad-project').collection('todos');
    console.log('DB client connected');
  });
}

module.exports.add = (todo) => {
  return new Promise((resolve, reject) => {
    collection.insertOne({
      title: todo.title,
      isComplete: todo.isComplete
    }, (err, todo) => {
      if (err) {
        reject({
          code: 500,
          msg: err
        });
      } else {
        resolve(todo.id);
      }
    });
  });
}

module.exports.update = (todo) => {
  return new Promise((resolve, reject) => {
    collection.updateOne({
      _id: new mongodb.ObjectID(todo.id)
    }, {
      $set: {
        title: todo.title,
        isComplete: todo.isComplete
      }
    }, (err) => {
      if (err) {
        reject({
          code: 500,
          msg: err
        });
      } else {
        resolve();
      }
    });
  });
}

module.exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    collection.deleteOne({ _id: new mongodb.ObjectID(id) }, (err) => {
      if (err) {
        reject({
          code: 500,
          msg: err
        });
      } else {
        resolve();
      }
    });
  });
}

module.exports.getAllTodos = () => {
  return new Promise((resolve, reject) => {
    collection.find().toArray((err, todos) => {
      if (err) {
        reject({
          code: 500,
          msg: err
        });
      }
      resolve(todos.map((item) => {
        return {
          id: item._id,
          title: item.title,
          isComplete: item.isComplete === 'true'
        }
      }));
    });
  });
}
