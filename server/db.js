var mongodb = require('mongodb');
var Promise = require('promise');

const MongoClient = mongodb.MongoClient, format = require('util').format;
var collection;
MongoClient.connect('mongodb://ds113738.mlab.com:13738/todo-grad-project',
  {
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
        resolve(todo);
      }
    });
  });
}

module.exports.update = (todo) => {
  collection.updateOne({
    _id: todo.dbId
  }, {
    $set: {
      title: todo.title,
      isComplete: todo.isComplete
    }
  }, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports.delete = (id) => {
  collection.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports.getAllTodos = () => {
  return new Promise((resolve, reject) => {
    collection.find().toArray((err, todoDocs) => {
      if (err) {
        reject({
          code: 500,
          msg: err
        });
      }
      resolve(todoDocs.map((item, index) => {
        return {
          id: index.toString(),
          title: item.title,
          isComplete: item.isComplete === 'true',
          dbId: item._id
        }
      }));
    });
  });
}
