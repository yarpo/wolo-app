// import React from 'react';
// import {render, screen} from '@testing-library/react';
// import {I18nextProvider} from 'react-i18next';
// import i18n from '../../i18nTests';
// import Details from './Details';
// import {BrowserRouter} from "react-router-dom";
// import {FiltersProvider} from "../Filters/FiltersContext";

// describe('Details', () => {
//     it('should render without errors', () => {
//         render(
//             <I18nextProvider i18n={i18n}>
//                 <BrowserRouter>
//                     <FiltersProvider>
//                         <Details/>
//                     </FiltersProvider>
//                 </BrowserRouter>
//             </I18nextProvider>
//         );
//     });

//     it('should display event information correctly', () => {
//         render(
//             <I18nextProvider i18n={i18n}>
//                 <BrowserRouter>
//                     <FiltersProvider>
//                         <Details/>
//                     </FiltersProvider>
//                 </BrowserRouter>
//             </I18nextProvider>
//         );
//         const dateInfo = screen.getByText("Date:");
//         const timeInfo = screen.getByText("Time:");
//         const categoryInfo = screen.getByText("Category:");
//         const organizerInfo = screen.getByText("Organiser:");
//         expect(dateInfo).toBeInTheDocument();
//         expect(timeInfo).toBeInTheDocument();
//         expect(categoryInfo).toBeInTheDocument();
//         expect(organizerInfo).toBeInTheDocument();
//     });

//     it('should display event information correctly in Polish', () => {
//         i18n.changeLanguage("pl");
//         render(
//             <I18nextProvider i18n={i18n}>
//                 <BrowserRouter>
//                     <FiltersProvider>
//                         <Details/>
//                     </FiltersProvider>
//                 </BrowserRouter>
//             </I18nextProvider>
//         );
//         const dateInfo = screen.getByText("Data:");
//         const timeInfo = screen.getByText("Czas:");
//         const categoryInfo = screen.getByText("Kategoria:");
//         const organizerInfo = screen.getByText("Organizator:");
//         expect(dateInfo).toBeInTheDocument();
//         expect(timeInfo).toBeInTheDocument();
//         expect(categoryInfo).toBeInTheDocument();
//         expect(organizerInfo).toBeInTheDocument();
//     });
// });
