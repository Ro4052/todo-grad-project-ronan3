import React from 'react';
import { shallow, mount } from 'enzyme';

import TitleInput from './TitleInput';

describe('<TitleInput /> tests', () => {
  it('updates the state when typed in', (done) => {
    const wrapper = shallow(<TitleInput />);
    wrapper.find('Input').simulate('change', { target: { value: 'new title' } });
    expect(wrapper.state().inputText).toEqual('new title');
    done();
  });
  it('displays the right initial text', (done) => {
    const wrapper = shallow(<TitleInput initialText='initial' />);
    expect(wrapper.state().inputText).toEqual('initial');
    done();
  });
  it('shows errored input when submitting with no text', (done) => {
    const wrapper = mount(<TitleInput />);
    wrapper.find('form').simulate('submit');
    expect(wrapper.state().inputError).toEqual(true);
    done();
  });
  it('calls handleSubmit on valid submit', (done) => {
    const handleSubmit = jest.fn();
    const wrapper = mount(<TitleInput handleSubmit={handleSubmit} initialText='initial' />);
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalled();
    done();
  });
});