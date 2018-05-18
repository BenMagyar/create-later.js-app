import Landing from '../../src/components/Landing';
import React from 'react';
import { shallow } from 'enzyme';

describe('Landing', () => {
  it('should say "👋"', () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper.text()).toContain('👋');
  });
});
