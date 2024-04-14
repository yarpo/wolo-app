import React from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import AllEvents from './AllEvents';
import { BrowserRouter } from "react-router-dom";
import { FiltersProvider } from "../Filters/FiltersContext";

describe('AllEvents', () => {
  it('should render without errors', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <FiltersProvider>
            <AllEvents />
          </FiltersProvider>
        </BrowserRouter>
      </I18nextProvider>
    );
  });
});
