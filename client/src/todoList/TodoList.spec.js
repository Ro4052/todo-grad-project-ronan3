import React from 'react';
import { shallow, mount } from 'enzyme';
import moxios from 'moxios';

import { TodoList } from './TodoList';

describe('<TodoList /> tests', () => {
  const todos = [
    { id: '0', title: 'todo 1', isComplete: false },
    { id: '1', title: 'todo 2', isComplete: true }
  ];

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('dispatches getTodos action', (done) => {
    const getTodos = jest.fn();
    const wrapper = shallow(<TodoList todos={[]} getTodos={getTodos} />);
    expect(getTodos).toHaveBeenCalled();
    done();
  });
  it('filters by active when relavant button is clicked', (done) => {
    const wrapper = mount(<TodoList todos={todos} getTodos={() => {}} />);
    wrapper.find('Button').at(1).simulate('click');
    expect(wrapper.find('TodoItem').length).toEqual(1);
    done();
  });
  it('filters by completed when relavant button is clicked', (done) => {
    const wrapper = mount(<TodoList todos={todos} getTodos={() => {}} />);
    wrapper.find('Button').at(2).simulate('click');
    expect(wrapper.find('TodoItem').length).toEqual(1);
    done();
  });
});
