import React, { Component } from 'react';
import { List, Input, Button } from 'semantic-ui-react';
import axios from 'axios';

import TodoItem from './todoItem/TodoItem';
import TopRow from './topRow/TopRow';
import './TodoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filter: 'all',
      createTitle: ''
    }
    this.updateFilter = this.updateFilter.bind(this);
    this.updateCreateTitle = this.updateCreateTitle.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.deleteCompleted = this.deleteCompleted.bind(this);
    this.getTodoList();
  }

  getTodoList() {
    axios.get('/api/todo')
      .then(res => {
        this.setState({
          todos: res.data
        });
      });
  }

  updateFilter(event) {
    this.setState({
      filter: event.target.id
    });
  }

  updateCreateTitle(event) {
    this.setState({
      createTitle: event.target.value
    });
  }

  createTodo(event) {
    event.preventDefault();
    if (!this.state.createTitle) {
      return;
    }

    const todo = {
      title: this.state.createTitle,
      isComplete: false
    }
    axios.post('/api/todo', {
      title: todo.title,
      isComplete: todo.isComplete
    })
      .then(res => {
        if (res.status === 201) {
          const todos = this.state.todos;
          todo.id = res.data.toString();
          todos.push(todo);
          this.setState({
            createTitle: '',
            todos: todos
          });
        }
      });
  }

  updateTodo(todo) {
    axios.put(`/api/todo/${todo.id}`, {
      title: todo.title,
      isComplete: todo.isComplete
    })
      .then(res => {
        if (res.status === 201) {
          const todos = this.state.todos;
          todos[todos.indexOf(todo)] = todo;
          this.setState({
            todos: todos
          });
        }
      })
  }

  deleteTodo(id) {
    axios.delete(`/api/todo/${id}`)
      .then(res => {
        if (res.status === 200) {
          const todos = this.state.todos.filter(todo =>
            todo.id !== id
          );
          this.setState({
            todos: todos
          });
        }
      });
  }

  deleteCompleted() {
    const todos = this.state.todos;
    todos.forEach(todo => {
      if (todo.isComplete) {
        this.deleteTodo(todo.id);
      }
    });
  }

  render() {
    const displayList = this.state.todos.map(todo => {
      if (this.state.filter === 'all' || (this.state.filter === 'active' && !todo.isComplete) ||
        (this.state.filter === 'completed' && todo.isComplete)) {
        return <TodoItem key={todo.id} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} todo={todo} />
      }
      return null;
    });
    const numCompleted = this.state.todos.filter(todo => todo.isComplete).length;

    return (
      <div className='holder'>
        <TopRow numCompleted={numCompleted} updateFilter={this.updateFilter} deleteCompleted={this.deleteCompleted} />
        <List celled>
          {displayList.length ? displayList : 'No todos, create one below!'}
        </List>
        <form>
          <Input
            action={ <Button content='Create' onClick={this.createTodo} /> }
            value={this.state.createTitle}
            onChange={this.updateCreateTitle}
            placeholder='Create a new todo...'
          />
        </form>
      </div>
    );
  }
}

export default TodoList;
