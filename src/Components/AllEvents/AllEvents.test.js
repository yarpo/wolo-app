import React from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import AllEvents from './AllEvents';

describe('AllEvents', () => {
  beforeAll(() => {
    i18n.init({
      debug: true,
      fallbackLng: 'en',
    });
  });

  it('should render without errors', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <AllEvents />
      </I18nextProvider>
    );
  });
});
