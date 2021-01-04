import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login Component', () => {
  it('check render popup', () => {
    const component = shallow(<Login />);
    component
      .find('Search')
      .props()
      .handleVisibleSearchArea(true);

    expect(component.state().isVisibleSearchArea).toBe(true);
    expect(document.body.classList.contains('is-open-search')).toBe(true);
  });
});
