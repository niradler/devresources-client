import React from 'react';
import { shallow } from 'enzyme';
import ResourceCard from './ResourceCard';

describe('<ResourceCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<ResourceCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
