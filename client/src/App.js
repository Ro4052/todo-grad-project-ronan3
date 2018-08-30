import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';

import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            newTitle: ''
        }
        this.updateNewTitle = this.updateNewTitle.bind(this);
        this.createTodo = this.createTodo.bind(this);
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

    updateNewTitle(event) {
        this.setState({
            newTitle: event.target.value
        });
    }

    createTodo(event) {
        event.preventDefault();
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

    render() {
        const displayList = this.state.todos.map(todo => 
            <div key={todo.id}> {todo.title} </div>
        );
        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <h1 className='App-title'> TODO List </h1>
                </header>
                <div className='todo-list'>
                    {displayList.length ? displayList : 'No todos, create one below!'}
                </div>
                <form>
                    <Input className='create-input' value={this.state.newTitle} onChange={this.updateNewTitle} placeholder='Create a new todo...' />
                    <Button type='submit' onClick={this.createTodo}> Create </Button>
                </form>
            </div>
        );
    }
}

export default App;
