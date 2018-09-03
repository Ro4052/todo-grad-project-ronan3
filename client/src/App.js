import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import TodoList from './todoList/TodoList';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className='App'>
                <header className='App-header'>
                    <Icon name='edit' size='huge' />
                    <h1 className='App-title'> TODO List </h1>
                </header>
                <TodoList />
            </div>
        );
    }
}

export default App;
