import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('<App /> tests', () => {
  it('shows the right heading', (done) => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('h1').text()).toEqual(' TODO List ');
    done();
  });
});
