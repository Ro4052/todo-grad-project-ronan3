import React from 'react';
import { shallow, mount } from 'enzyme';

import TodoItem from './TodoItem';

describe('<TodoItem /> tests', () => {
  let todo;
  beforeEach(() => {
    todo = {
      id: 0,
      title: 'todo item',
      isComplete: false
    }
  });

  it('shows two buttons for the todo', (done) => {
    const wrapper = shallow(<TodoItem todo={todo} updateTodo={() => {}} deleteTodo={() => {}} />);
    expect(wrapper.find('Button').length).toEqual(2);
    done();
  });
  it('shows complete button if isComplete is false', (done) => {
    const wrapper = shallow(<TodoItem todo={todo} updateTodo={() => {}} deleteTodo={() => {}} />);
    expect(wrapper.find('Button').first().get(0).props.id).toEqual('complete');
    done();
  });
  it('shows revert button if isComplete is true', (done) => {
    todo.isComplete = true;
    const wrapper = shallow(<TodoItem todo={todo} updateTodo={() => {}} deleteTodo={() => {}} />);
    expect(wrapper.find('Button').first().get(0).props.id).toEqual('revert');
    done();
  });
  it('clicking complete button calls updateTodo', (done) => {
    const updateTodo = jest.fn();
    const wrapper = mount(<TodoItem todo={todo} updateTodo={updateTodo} deleteTodo={() => {}} />);
    wrapper.find('Button').first().simulate('click');
    expect(updateTodo).toHaveBeenCalled();
    done();
  });
  it('clicking revert button calls updateTodo', (done) => {
    todo.isComplete = true;
    const updateTodo = jest.fn();
    const wrapper = mount(<TodoItem todo={todo} updateTodo={updateTodo} deleteTodo={() => {}} />);
    wrapper.find('Button').first().simulate('click');
    expect(updateTodo).toHaveBeenCalled();
    done();
  });
  it('clicking delete button calls deleteTodo', (done) => {
    const deleteTodo = jest.fn();
    const wrapper = mount(<TodoItem todo={todo} updateTodo={() => {}} deleteTodo={deleteTodo} />);
    wrapper.find('Button').last().simulate('click');
    expect(deleteTodo).toHaveBeenCalled();
    done();
  });
  it('editing todo title calls updateTodo', (done) => {
    const updateTodo = jest.fn();
    const wrapper = mount(<TodoItem todo={todo} updateTodo={updateTodo} deleteTodo={() => {}} />);
    wrapper.setState({
      titleChange: true,
      newTitle: 'new title'
    });
    wrapper.find('form').simulate('submit');
    expect(updateTodo).toHaveBeenCalled();
    done();
  });
});
