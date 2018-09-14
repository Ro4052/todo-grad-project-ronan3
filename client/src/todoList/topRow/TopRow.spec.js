import React from 'react';
import { shallow } from 'enzyme';

import TopRow from './TopRow';

describe('<TopRow /> tests', () => {
  it('calls updateFilter when all is clicked', (done) => {
    const updateFilter = jest.fn();
    const wrapper = shallow(<TopRow updateFilter={updateFilter} />);
    wrapper.find('Button').first().simulate('click');
    expect(updateFilter).toHaveBeenCalled();
    done();
  });
  it('calls updateFilter when active is clicked', (done) => {
    const updateFilter = jest.fn();
    const wrapper = shallow(<TopRow updateFilter={updateFilter} />);
    wrapper.find('Button').at(1).simulate('click');
    expect(updateFilter).toHaveBeenCalled();
    done();
  });
  it('calls updateFilter when completed is clicked', (done) => {
    const updateFilter = jest.fn();
    const wrapper = shallow(<TopRow updateFilter={updateFilter} />);
    wrapper.find('Button').at(2).simulate('click');
    expect(updateFilter).toHaveBeenCalled();
    done();
  });
  it('disables Delete Completed button when numCompleted === 0', (done) => {
    const wrapper = shallow(<TopRow numCompleted={0} />);
    expect(wrapper.find('Button').last().get(0).props.disabled).toEqual(true);
    done();
  });
  it('enables Delete Completed button when numCompleted > 0', (done) => {
    const wrapper = shallow(<TopRow numCompleted={4} />);
    expect(wrapper.find('Button').last().get(0).props.disabled).toEqual(false);
    done();
  });
  it('alls deleteCompleted when the button is presssed', (done) => {
    const deleteCompleted = jest.fn();
    const wrapper = shallow(<TopRow numCompleted={4} deleteCompleted={deleteCompleted} />);
    wrapper.find('Button').last().simulate('click');
    expect(deleteCompleted).toHaveBeenCalled();
    done();
  });
  it('displays the right number of active todos', (done) => {
    const wrapper = shallow(<TopRow numActive={3} />);
    expect(wrapper.find('Label').first().get(0).props.children[1]).toEqual(3);
    done();
  });
  it('displays the right number of completed todos', (done) => {
    const wrapper = shallow(<TopRow numCompleted={5} />);
    expect(wrapper.find('Label').last().get(0).props.children[1]).toEqual(5);
    done();
  });
});
