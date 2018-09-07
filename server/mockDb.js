var Promise = require('promise');

let todos = [];
let nextId = 0;

module.exports.connect = () => {}

module.exports.reset = () => {
  todos = [];
  nextId = 0;
}

module.exports.add = (todo) => {
  return new Promise((resolve) => {
    todo.id = nextId.toString();
    nextId++;
    todos.push(todo);
    resolve(todo.id);
  });
}

module.exports.update = (todo) => {
  return new Promise((resolve) => {
    let copy = todos.find((otherTodo) =>
      otherTodo.id === todo.id
    );
    copy.title = todo.title;
    copy.isComplete = todo.isComplete;
    resolve();
  });
}

module.exports.delete = (id) => {
  return new Promise((resolve) => {
    todos = todos.filter((todo) =>
      todo.id !== id
    );
    resolve();
  });
}

module.exports.deleteCompleted = () => {
  return new Promise((resolve) => {
    todos = todos.filter((todo) =>
      !todo.isComplete
    );
    resolve();
  })
}

module.exports.getAllTodos = () => {
  return new Promise((resolve) =>
    resolve(todos)
  );
}
