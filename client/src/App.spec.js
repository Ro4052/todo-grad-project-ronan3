import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('<App /> renders properly', () => {
  it('shows the right heading', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('h1').text()).toEqual(' TODO List ');
  });
});
