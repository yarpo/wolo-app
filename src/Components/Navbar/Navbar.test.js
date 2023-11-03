import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {I18nextProvider} from 'react-i18next';
import i18n from '../../i18nTests';
import Navbar from './Navbar';
import {BrowserRouter} from "react-router-dom";
import {FiltersProvider} from "../Filters/FiltersContext";

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

    it('Navbar can change language to "pl" and updates text', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <FiltersProvider>
                        <Navbar/>
                    </FiltersProvider>
                </BrowserRouter>
            </I18nextProvider>
        );
        const selectElement = screen.getByTestId('languages-select'); // Znajdź select

        fireEvent.change(selectElement, {target: {value: 'pl'}});

        expect(selectElement.value).toBe('pl');

        const liElement = screen.getByText('Potrzebują Ciebie');

        expect(liElement).toHaveTextContent('Potrzebują Ciebie');
    });

    it('Icon changes based on the initial state of "clicked"', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <FiltersProvider>
                        <Navbar/>
                    </FiltersProvider>
                </BrowserRouter>
            </I18nextProvider>
        );

        const mobileButton = screen.getByTestId('mobile');
        const iconElement = screen.getByTestId('bar');

        expect(iconElement).toHaveClass('fas fa-bars');

        fireEvent.click(mobileButton);

        expect(iconElement).toHaveClass('fas fa-times');

        fireEvent.click(mobileButton);

        expect(iconElement).toHaveClass('fas fa-bars');
    });
});
