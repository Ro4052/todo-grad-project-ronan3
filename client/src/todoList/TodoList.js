import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';

import TodoItem from './todoItem/TodoItem';
import TopRow from './topRow/TopRow';
import TitleInput from './../core/titleInput/TitleInput';
import './TodoList.css';

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteCompleted
} from '../actions';

export class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 'all'
    }
    this.updateFilter = this.updateFilter.bind(this);
    this.props.getTodos();
  }

  updateFilter(event) {
    this.setState({
      filter: event.target.id
    });
  }

  updateCreateTitle(event) {
    this.setState({
      createTitle: event.target.value,
      inputError: false
    });
  }

  render() {
    const displayList = this.props.todos.map((todo, index) => {
      if (this.state.filter === 'all' || (this.state.filter === 'active' && !todo.isComplete) ||
        (this.state.filter === 'completed' && todo.isComplete)) {
        return <TodoItem key={index} todo={todo} updateTodo={this.props.updateTodo} deleteTodo={this.props.deleteTodo} />;
      }
      return null;
    });
    const numCompleted = this.props.todos.filter((todo) => todo.isComplete).length;

    return (
      <div className='holder'>
        <TopRow numCompleted={numCompleted} updateFilter={this.updateFilter} deleteCompleted={this.props.deleteCompleted} />
        <List celled>
          {displayList.length ? displayList : 'No todos, create one below!'}
        </List>
        <TitleInput
          action='Create'
          fullWidth={false}
          placeholder='Create a new todo...'
          initialText=''
          handleSubmit={this.props.createTodo} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos
});

const mapDispatchToProps = (dispatch) => ({
  getTodos() { dispatch(getTodos()); },
  createTodo(todo) { dispatch(createTodo(todo)); },
  updateTodo(todo) { dispatch(updateTodo(todo)); },
  deleteTodo(id) { dispatch(deleteTodo(id)); },
  deleteCompleted() { dispatch(deleteCompleted()); }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
