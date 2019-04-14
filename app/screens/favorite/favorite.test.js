import React from 'react';
import { shallow } from 'enzyme';
import Favorite from './favorite';

describe('<Favorite />', () => {
  test('renders', () => {
    const wrapper = shallow(<Favorite />);
    expect(wrapper).toMatchSnapshot();
  });
});
