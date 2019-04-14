import React from 'react';
import { shallow } from 'enzyme';
import FilmItem from './FilmItem';

describe('<FilmItem />', () => {
  test('renders', () => {
    const wrapper = shallow(<FilmItem />);
    expect(wrapper).toMatchSnapshot();
  });
});
