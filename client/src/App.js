import React, { Component } from 'react';
import { Segment, List, Input, Button } from 'semantic-ui-react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

import TodoItem from './TodoItem/TodoItem';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            filter: 'all',
            newTitle: ''
        }
        this.updateFilter = this.updateFilter.bind(this);
        this.updateNewTitle = this.updateNewTitle.bind(this);
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

    updateNewTitle(event) {
        this.setState({
            newTitle: event.target.value
        });
    }

    createTodo(event) {
        event.preventDefault();
        if (!this.state.newTitle) {
            return;
        }

        const todo = {
            title: this.state.newTitle,
            isComplete: false
        }
        axios.post('/api/todo', {
                title: todo.title,
                isComplete: todo.isComplete
            })
            .then(res => {
                if (res.status === 201) {
                    const todos = this.state.todos;
                    todo.id = res.data;
                    todos.push(todo);
                    this.setState({
                        newTitle: '',
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
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <h1 className='App-title'> TODO List </h1>
                </header>
                <div className='holder'>
                    <Segment className='top-row'>
                        <Button.Group>
                            <Button id='all' onClick={this.updateFilter}> All </Button>
                            <Button id='active' onClick={this.updateFilter}> Active </Button>
                            <Button id='completed' onClick={this.updateFilter}> Completed </Button>
                        </Button.Group>
                        <Button
                            negative
                            disabled={numCompleted === 0}
                            className='delete-completed'
                            onClick={this.deleteCompleted}> Delete Completed </Button>
                    </Segment>
                    <List celled>
                        {displayList.length ? displayList : 'No todos, create one below!'}
                    </List>
                    <form>
                        <Input
                            action={ <Button content='Create' onClick={this.createTodo} /> }
                            value={this.state.newTitle}
                            onChange={this.updateNewTitle}
                            placeholder='Create a new todo...'
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default App;
