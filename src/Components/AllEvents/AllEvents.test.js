import React from 'react';
import { render } from '@testing-library/react';
import AllEvents from './AllEvents';

describe('AllEvents', () => {
    it('rendering without errors', () => {
        render(<AllEvents />);
    })
});

