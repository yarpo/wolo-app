import React from 'react';
import { render } from '@testing-library/react';
import MoreEvents from './MoreEvents';

describe('MoreEvents', () => {
  it('rendering without errors', () => {
    render(<MoreEvents />);
  });
});
