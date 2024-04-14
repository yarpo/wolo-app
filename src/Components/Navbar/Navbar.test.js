import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {I18nextProvider} from 'react-i18next';
import i18n from '../../i18n';
import Navbar from './Navbar';
import {BrowserRouter} from "react-router-dom";
import {FiltersProvider} from "../Filters/FiltersContext";


beforeEach(() => {
    i18n.init();
  });


describe('Navbar', () => {
    it('should render without errors', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <FiltersProvider>
                        <Navbar/>
                    </FiltersProvider>
                </BrowserRouter>
            </I18nextProvider>
        );
    });


   
    it('Icon changes based on the initial state of "clicked"', async () => {
        render(
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <FiltersProvider>
                        <Navbar/>
                    </FiltersProvider>
                </BrowserRouter>
            </I18nextProvider>
        );

        await waitFor(() => {
            const mobileButton = screen.getByTestId('mobile');
            expect(mobileButton).toBeInTheDocument();
        });

        const mobileButton = screen.getByTestId('mobile');
        fireEvent.click(mobileButton);

        const iconElement = screen.getByTestId('bar');
        expect(iconElement).toHaveClass('fas fa-times');

        fireEvent.click(mobileButton);
        expect(iconElement).toHaveClass('fas fa-bars');
    });

});
