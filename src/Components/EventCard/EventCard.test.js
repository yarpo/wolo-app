import React from 'react';
import { render } from '@testing-library/react';
import EventCard from './EventCard';

describe('EventCard', () => {
    it('rendering without errors', () => {
        render(<EventCard />);
    })
});

