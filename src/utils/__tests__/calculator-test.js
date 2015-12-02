import React from 'react';
import { div } from 'react-dom';
import calculator from '../calculator';

describe('calculator', () => {

  it('1 + 1 = 2', () => {
    expect(calculator.add(1, 1)).toEqual(2);
  });

});
