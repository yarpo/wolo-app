import React from 'react';
import {render} from '@testing-library/react';
import MoreEvents from './MoreEvents';

describe('MoreEvents', () => {
  it('rendering without errors', () => {
    render(<MoreEvents/>);
  });

  it('should render the text "More Events from this Organizer"', () => {
    const {getByText} = render(<MoreEvents/>);
    // we use i18n to translate the text so it's not text, but key passed
    // to translate function (mocked in setupTests.js)
    const text = getByText('moreEventsFromThisOrganizer');
    expect(text).toBeInTheDocument();
  });
});
