var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

module.exports = function (port, dirPath, db, middleware, callback) {
  const app = express();
  db.connect();

  if (middleware) {
    app.use(middleware);
  }
  app.use(express.static(dirPath));
  app.use(bodyParser.json());

  // Create
  app.post('/api/todo', function (req, res) {
    db.add(req.body).then((todo) => {
      res.status(201);
      res.send(todo.insertedId);
    }).catch((err) => {
      console.log(err.msg);
      res.sendStatus(err.code);
    });
  });

  // Update
  app.put('/api/todo/:id', function (req, res) {
    const todo = req.body;
    todo.id = req.params.id;
    db.update(todo).then(() => {
      res.sendStatus(201);
    }).catch((err) => {
      console.log(err.msg);
      res.sendStatus(err.code);
    });
  });

  // Read
  app.get('/api/todo', function (req, res) {
    db.getAllTodos().then((todos) => {
      res.status(200);
      res.json(todos);
    }).catch((err) => {
      console.log(err.msg);
      res.sendStatus(err.code);
    });
  });

  // Delete
  app.delete('/api/todo/:id', function (req, res) {
    db.delete(req.params.id).then(() => {
      res.sendStatus(200);
    }).catch((err) => {
      console.log(err.msg);
      res.sendStatus(err.code);
    });
  });

  const server = app.listen(port, callback);

  // We manually manage the connections to ensure that they're closed when calling close().
  const connections = [];
  server.on('connection', function (connection) {
    connections.push(connection);
  });

  return {
    close: function (callback) {
      connections.forEach(function (connection) {
        connection.destroy();
      });
      server.close(callback);
    }
  };
};
