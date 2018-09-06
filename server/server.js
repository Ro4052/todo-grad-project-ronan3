var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var db = require('./db');

module.exports = function (port, dirPath, middleware, callback) {
  const app = express();

  if (middleware) {
    app.use(middleware);
  }
  app.use(express.static(dirPath));
  app.use(bodyParser.json());

  let latestId = 0;
  let todos = [];

  // Create
  app.post('/api/todo', function (req, res) {
    const todo = req.body;
    todo.id = latestId.toString();
    latestId++;
    todos.push(todo);
    res.status(201);
    db.add(todo).then((dbTodo) => {
      todo.dbId = dbTodo.insertedId;
      res.send(todo.id);
    });
  });

  // Update
  app.put('/api/todo/:id', function (req, res) {
    const todo = getTodo(req.params.id);
    if (todo) {
      todo.title = req.body.title;
      todo.isComplete = req.body.isComplete;
      db.update(todo);
      res.sendStatus(201);
    } else {
      res.sendStatus(404);
    }
  });

  // Read
  app.get('/api/todo', function (req, res) {
    if (!latestId) {
      db.getAllTodos().then((dbTodos) => {
        todos = dbTodos;
        latestId = todos.length;
        res.json(todos);
      });
    } else {
      res.json(todos);
    }
  });

  // Delete
  app.delete('/api/todo/:id', function (req, res) {
    const id = req.params.id;
    const todo = getTodo(id);
    if (todo) {
      todos = todos.filter(function (otherTodo) {
        if (otherTodo === todo) {
          db.delete(todo.dbId);
          return false;
        }
        return true;
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });

  function getTodo(id) {
    return _.find(todos, function (todo) {
      return todo.id === id
    });
  }

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
