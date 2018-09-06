import React from 'react';
import { shallow, mount } from 'enzyme';
import moxios from 'moxios';

import TodoList from './TodoList';

describe('<TodoList /> tests', () => {
  const getResponse = [
    { id: '0', title: 'todo 1', isComplete: false },
    { id: '1', title: 'todo 2', isComplete: true }
  ];

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('gets the todo list from the server', (done) => {
    const wrapper = shallow(<TodoList />);
    moxios.wait(() => {
      const getRequest = moxios.requests.mostRecent();
      getRequest.respondWith({
        response: getResponse
      }).then(() => {
        expect(wrapper.state().todos.length).toEqual(2);
        done();
      });
    });
  });
  it('updates the state when typing in the input', (done) => {
    const wrapper = shallow(<TodoList />);
    moxios.wait(() => {
      const getRequest = moxios.requests.mostRecent();
      getRequest.respondWith({
        response: getResponse
      }).then(() => {
        wrapper.find('Input').simulate('change', { target: { value: 'new title' } });
        expect(wrapper.state().createTitle).toEqual('new title');
        done();
      });
    });
  });
  it('creates a new todo', (done) => {
    const wrapper = mount(<TodoList />);
    wrapper.setState({ createTitle: 'new title' });
    wrapper.find('Button').last().simulate('click');
    moxios.wait(() => {
      const putRequest = moxios.requests.mostRecent();
      putRequest.respondWith({
        status: 201,
        response: 2
      }).then(() => {
        expect(wrapper.state().todos.length).toEqual(1);
        done();
      });
    });
  });
  it('filters by active when relavant button is clicked', (done) => {
    const wrapper = mount(<TodoList />);
    wrapper.setState({ todos: getResponse });
    wrapper.find('Button').at(1).simulate('click');
    expect(wrapper.find('TodoItem').length).toEqual(1);
    done();
  });
  it('filters by completed when relavant button is clicked', (done) => {
    const wrapper = mount(<TodoList />);
    wrapper.setState({ todos: getResponse });
    wrapper.find('Button').at(2).simulate('click');
    expect(wrapper.find('TodoItem').length).toEqual(1);
    done();
  });
});
