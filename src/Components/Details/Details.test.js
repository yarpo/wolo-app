import React from 'react';
import { render } from '@testing-library/react';
import Details from './Details';

describe('Details', () => {
    it('rendering without errors', () => {
        render(<Details />);
    })
});

