import React, { Component } from 'react';
import { List, Button, Icon } from 'semantic-ui-react';

import './TodoItem.css';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.clickDelete = this.clickDelete.bind(this);
        this.clickUpdateTodo = this.clickUpdateTodo.bind(this);
    }

    clickUpdateTodo(event) {
        const todo = this.props.todo;
        todo.isComplete = event.target.id === "complete" ? true : false;
        this.props.updateTodo(todo);
    }

    clickDelete() {
        this.props.deleteTodo(this.props.todo.id);
    }

    render() {
        const completeButton =
            <Button icon positive onClick={this.clickUpdateTodo}>
                <Icon id="complete" name='thumbs up' />
            </Button>;
        const revertButton =
            <Button icon primary onClick={this.clickUpdateTodo}>
                <Icon id="revert" name='undo' />
            </Button>;
        const titleClass = this.props.todo.isComplete ? 'completed-todo' : null;

        return (
            <List.Item className='list-item'>
                <p className={titleClass}> {this.props.todo.title} </p>
                <div>
                    {this.props.todo.isComplete ? revertButton : completeButton}
                    <Button icon onClick={this.clickDelete}>
                        <Icon color='red' name='trash' />
                    </Button>
                </div>
            </List.Item>
        );
    }
}

export default TodoItem;
