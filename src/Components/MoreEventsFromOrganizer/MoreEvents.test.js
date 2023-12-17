import React from 'react';
import { render } from '@testing-library/react';
import MoreEvents from './MoreEvents';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) 
  .init({
  });

describe('MoreEvents', () => {
  it('rendering without errors', () => {
    render(<MoreEvents />);
  });
});
