// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { I18nextProvider } from 'react-i18next';
// import i18n from '../../i18nTests';
// import EventCard from './EventCard';
// import data from '../../eventsData.json';
// import {BrowserRouter} from "react-router-dom";
// import {FiltersProvider} from "../Filters/FiltersContext";

// describe('EventCard', () => {


//   it('should render without errors', () => {
//     render(
//         <I18nextProvider i18n={i18n}>
//           <BrowserRouter>
//             <FiltersProvider>
//               <EventCard event={data} />
//             </FiltersProvider>
//           </BrowserRouter>
//         </I18nextProvider>
//     );
//   });

//   const event = {
//     id: 1,
//     title: "Darmowe obiady dla potrzebujących",
//     location: "Gdańsk - Wrzeszcz",
//     date: "2023-06-10",
//     time: "10:00",
//     organizedBy: "Fundacja Pomocna Dłoń",
//     participantsNeeded: 5,
//     participantsSignedIn: 3,
//     category: "Pomoc Społeczna",
//     ageRestrictions: "18+",
//     requiresVerification: true
//   };

//   it("should render EventCard without errors", () => {
//     render(
//         <I18nextProvider i18n={i18n}>
//           <BrowserRouter>
//             <EventCard event={event}/>
//           </BrowserRouter>
//         </I18nextProvider>
//     );

//     expect(screen.getByText("Darmowe obiady dla potrzebujących")).toBeInTheDocument();
//     expect(screen.getByText("Gdańsk - Wrzeszcz")).toBeInTheDocument();
//     expect(screen.getByText("2023-06-10")).toBeInTheDocument();
//     expect(screen.getByText("10:00")).toBeInTheDocument();
//     expect(screen.getByText("Fundacja Pomocna Dłoń")).toBeInTheDocument();
//     expect(screen.getByText("5")).toBeInTheDocument();
//     expect(screen.getByText("3")).toBeInTheDocument();
//   });

//   it("should display event information with Polish translation", () => {
//     // Ustaw język na polski
//     i18n.changeLanguage("pl");

//     render(
//         <I18nextProvider i18n={i18n}>
//           <BrowserRouter>
//             <EventCard event={event} />
//           </BrowserRouter>
//         </I18nextProvider>
//     );

//     // Oczekuj, że tłumaczenia na polski będą używane
//     expect(screen.getByText("Lokalizacja:")).toBeInTheDocument();
//     expect(screen.getByText("Data:")).toBeInTheDocument();
//     expect(screen.getByText("Czas:")).toBeInTheDocument();
//     expect(screen.getByText("Organizowany przez:")).toBeInTheDocument();
//     expect(screen.getByText("Potrzebnych wolonatriuszy:")).toBeInTheDocument();
//     expect(screen.getByText("Zapisanych wolontariuszy:")).toBeInTheDocument();
//   });
// });
