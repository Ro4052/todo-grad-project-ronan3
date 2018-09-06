import React from 'react';
import { shallow } from 'enzyme';

import TopRow from './TopRow';

describe('<TopRow /> tests', () => {
  it('calls updateFilter when all is clicked', (done) => {
    const updateFilter = jest.fn();
    const wrapper = shallow(<TopRow numCompleted={0} updateFilter={updateFilter} deleteCompleted={() => {}} />);
    wrapper.find('Button').first().simulate('click');
    expect(updateFilter).toHaveBeenCalled();
    done();
  });
  it('calls updateFilter when active is clicked', (done) => {
    const updateFilter = jest.fn();
    const wrapper = shallow(<TopRow numCompleted={0} updateFilter={updateFilter} deleteCompleted={() => {}} />);
    wrapper.find('Button').at(1).simulate('click');
    expect(updateFilter).toHaveBeenCalled();
    done();
  });
  it('calls updateFilter when completed is clicked', (done) => {
    const updateFilter = jest.fn();
    const wrapper = shallow(<TopRow numCompleted={0} updateFilter={updateFilter} deleteCompleted={() => {}} />);
    wrapper.find('Button').at(2).simulate('click');
    expect(updateFilter).toHaveBeenCalled();
    done();
  });
  it('disables Delete Completed button when numCompleted === 0', (done) => {
    const wrapper = shallow(<TopRow numCompleted={0} updateFilter={() => {}} deleteCompleted={() => {}} />);
    expect(wrapper.find('Button').last().get(0).props.disabled).toEqual(true);
    done();
  });
  it('enables Delete Completed button when numCompleted > 0', (done) => {
    const wrapper = shallow(<TopRow numCompleted={4} updateFilter={() => {}} deleteCompleted={() => {}} />);
    expect(wrapper.find('Button').last().get(0).props.disabled).toEqual(false);
    done();
  });
});
