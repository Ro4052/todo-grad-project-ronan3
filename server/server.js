var express = require("express");
var bodyParser = require("body-parser");
var underscore = require("underscore");

module.exports = function(port, dirPath, middleware, callback) {
    var app = express();

    if (middleware) {
        app.use(middleware);
    }
    app.use(express.static(dirPath));
    app.use(bodyParser.json());

    var latestId = 0;
    var todos = [];

    // Create
    app.post("/api/todo", function(req, res) {
        var todo = req.body;
        todo.id = latestId.toString();
        latestId++;
        todos.push(todo);
        res.status(201);
        res.send(todo.id);
    });

    // Update
    app.put("/api/todo/:id", function(req, res) {
        var todo = getTodo(req.params.id);
        if (todo) {
            todo.title = req.body.title;
            todo.isComplete = req.body.isComplete;
            res.status(201);
            res.json({
                newId: todo.id,
                todos: todos
            });
        } else {
            res.sendStatus(404);
        }
    });

    // Read
    app.get("/api/todo", function(req, res) {
        res.json(todos);
    });

    // Delete
    app.delete("/api/todo/:id", function(req, res) {
        var id = req.params.id;
        var todo = getTodo(id);
        if (todo) {
            todos = todos.filter(function(otherTodo) {
                return otherTodo !== todo;
            });
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

    function getTodo(id) {
        return underscore.find(todos, function(todo) {
            return todo.id === id
        });
    }

    var server = app.listen(port, callback);

    // We manually manage the connections to ensure that they're closed when calling close().
    var connections = [];
    server.on("connection", function(connection) {
        connections.push(connection);
    });

    return {
        close: function(callback) {
            connections.forEach(function(connection) {
                connection.destroy();
            });
            server.close(callback);
        }
    };
};
