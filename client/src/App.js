import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
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

    render() {
        const displayList = this.state.todos.map(todo => 
            <div key={todo.id}> {todo.title} </div>
        );
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title"> TODO List </h1>
                </header>
                <div className="todo-list">
                    {displayList}
                </div>
            </div>
        );
    }
}

export default App;
