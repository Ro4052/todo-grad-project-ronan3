import React, { Component } from 'react';
import { List, Button, Icon } from 'semantic-ui-react';

import './TodoItem.css';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.clickDelete = this.clickDelete.bind(this);
    }

    clickDelete() {
        this.props.deleteTodo(this.props.id);
    }

    render() {
        return (
            <List.Item className="list-item">
                <p> {this.props.todo.title} </p>
                <div>
                    <Button icon onClick={this.clickDelete}>
                        <Icon color='red' name='trash' />
                    </Button>
                </div>
            </List.Item>
        );
    }
}

export default TodoItem;
