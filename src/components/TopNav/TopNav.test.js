import React from 'react';
import { shallow } from 'enzyme';
import TopNav from './TopNav';

describe('<TopNav />', () => {
  test('renders', () => {
    const wrapper = shallow(<TopNav />);
    expect(wrapper).toMatchSnapshot();
  });
});
