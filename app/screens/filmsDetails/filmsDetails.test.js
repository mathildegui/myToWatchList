import React from 'react';
import { shallow } from 'enzyme';
import FilmsDetails from './filmsDetails';

describe('<FilmsDetails />', () => {
  test('renders', () => {
    const wrapper = shallow(<FilmsDetails />);
    expect(wrapper).toMatchSnapshot();
  });
});
