var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

module.exports = (port, dirPath, db, middleware, callback) => {
  const app = express();
  db.connect();

  if (middleware) {
    app.use(middleware);
  }
  app.use(express.static(dirPath));
  app.use(bodyParser.json());

  // Create
  app.post('/api/todo', (req, res) => {
    const todo = req.body;
    db.add(todo).then((id) => {
      todo.id = id;
      res.status(201);
      res.send(id);
    }).catch((err) => {
      console.log(err.msg);
      res.sendStatus(err.code);
    });
  });

  // Update
  app.put('/api/todo/:id', (req, res) => {
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
  app.get('/api/todo', (req, res) => {
    db.getAllTodos().then((todos) => {
      res.status(200);
      res.json(todos);
    }).catch((err) => {
      console.log(err.msg);
      res.sendStatus(err.code);
    });
  });

  // Delete
  app.delete('/api/todo/:id', (req, res) => {
    db.delete(req.params.id).then(() => {
      res.sendStatus(200);
    }).catch((err) => {
      console.log(err.msg);
      res.sendStatus(err.code);
    });
  });

  // Delete completed
  app.delete('/api/todo', (req, res) => {
    db.deleteCompleted().then(() => {
      res.sendStatus(200);
    }).catch((err) => {
      console.log(err.msg);
      res.sendStatus(err.code);
    });
  });

  const server = app.listen(port, callback);

  // We manually manage the connections to ensure that they're closed when calling close().
  const connections = [];
  server.on('connection', (connection) => {
    connections.push(connection);
  });

  return {
    close: (callback) => {
      connections.forEach((connection) => {
        connection.destroy();
      });
      server.close(callback);
    }
  };
};
