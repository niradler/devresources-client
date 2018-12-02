import React from 'react';
import { shallow } from 'enzyme';
import SideNav from './SideNav';

describe('<SideNav />', () => {
  test('renders', () => {
    const wrapper = shallow(<SideNav />);
    expect(wrapper).toMatchSnapshot();
  });
});
