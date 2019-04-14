import React from 'react';
import { shallow } from 'enzyme';
import Lists from './lists';

describe('<Lists />', () => {
  test('renders', () => {
    const wrapper = shallow(<Lists />);
    expect(wrapper).toMatchSnapshot();
  });
});
