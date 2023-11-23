import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Hero from './Hero';
import i18n from '../../i18nTests';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { FiltersProvider } from '../Filters/FiltersContext';

describe('Hero', () => {
    it('should render without errors', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <FiltersProvider>
                        <Hero />
                    </FiltersProvider>
                </BrowserRouter>
            </I18nextProvider>
        );
    });

    it('should navigate to login and events pages', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <FiltersProvider>
                        <Hero />
                    </FiltersProvider>
                </BrowserRouter>
            </I18nextProvider>
        );

        const signInLink = screen.getByText('Sign in');
        const findEventLink = screen.getByText('find an event to join');

        expect(signInLink).toBeInTheDocument();
        expect(findEventLink).toBeInTheDocument();

        fireEvent.click(signInLink);
        expect(window.location.pathname).toBe('/login');

        fireEvent.click(findEventLink);
        expect(window.location.pathname).toBe('/events');
    });

    it('should handle date and location selection', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <BrowserRouter>
                    <FiltersProvider>
                        <Hero />
                    </FiltersProvider>
                </BrowserRouter>
            </I18nextProvider>
        );

        const dateInput = screen.getByPlaceholderText('Select a date');
        const locationSelect = screen.getByTestId("location-select");

        fireEvent.change(dateInput, { target: { value: '10/06/2023' } });
        expect(dateInput).toHaveValue('10/06/2023');

        fireEvent.change(locationSelect, { target: { value: 'Zaspa' } });
        expect(locationSelect).toHaveValue('Zaspa');
    });
});
