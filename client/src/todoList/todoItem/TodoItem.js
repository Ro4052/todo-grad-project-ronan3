import React, { Component } from 'react';
import { List, Button, Icon } from 'semantic-ui-react';

import TitleInput from './../../core/titleInput/TitleInput';
import './TodoItem.css';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleChange: false
    }
    this.pageClick = this.pageClick.bind(this);
    this.detectEscape = this.detectEscape.bind(this);
    this.closeInput = this.closeInput.bind(this);
    this.changeTitleInput = this.changeTitleInput.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.clickDelete = this.clickDelete.bind(this);
    this.clickUpdateTodo = this.clickUpdateTodo.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.pageClick, true);
    document.addEventListener('keydown', this.detectEscape, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.pageClick, true);
    document.removeEventListener('keydown', this.detectEscape, true);
  }

  pageClick(event) {
    if (event.target.id !== `title${this.props.todo.id}`) {
      this.closeInput();
    }
  }

  detectEscape(event) {
    if (event.keyCode === 27) {
      this.closeInput();
    }
  }

  closeInput() {
    this.changeTitleInput(false);
    this.setState({
      newTitle: this.props.todo.title
    });
  }

  changeTitleInput(active) {
    this.setState({
      titleChange: active
    });
  }

  updateTitle(newTitle) {    
    const todo = this.props.todo;
    todo.title = newTitle;
    this.props.updateTodo(todo);
    this.changeTitleInput(false);
  }

  clickUpdateTodo(event) {
    const todo = this.props.todo;
    todo.isComplete = event.target.id === 'complete' ? true : false;
    this.props.updateTodo(todo);
  }

  clickDelete() {
    this.props.deleteTodo(this.props.todo.id);
  }

  render() {
    const titleClass = this.props.todo.isComplete ? 'completed-todo' : null;
    const titleDisplay = this.state.titleChange && !this.props.todo.isComplete ?
      <TitleInput
        inputId={`title${this.props.todo.id}`}
        fullWidth={true}
        action={null}
        placeholder={null}
        initialText={this.props.todo.title}
        handleSubmit={this.updateTitle} /> :
      <p
        id={`title${this.props.todo.id}`}
        className={titleClass}
        onClick={() => this.changeTitleInput(true)}> {this.props.todo.title} </p>;

    const completeButton =
      <Button id='complete' icon positive onClick={this.clickUpdateTodo}>
        <Icon id='complete' name='thumbs up' />
      </Button>;
    const revertButton =
      <Button id='revert' icon primary onClick={this.clickUpdateTodo}>
        <Icon id='revert' name='undo' />
      </Button>;

    return (
      <List.Item className='list-item'>
        <div className='title-holder'>
          {titleDisplay}
        </div>
        <div className='action-buttons'>
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
