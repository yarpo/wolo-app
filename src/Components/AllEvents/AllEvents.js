import React, { useState } from 'react';
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EventCard from '../EventCard/EventCard';
import './AllEvents.css';

const AllEvents = () => {
    const [isOpen, setIsOpen] = useState(false);

    const locations = ['Zaspa', 'Chełm', 'Wrzeszcz'];
    const categories = ['Edukacja', 'Sport', 'Kultura', 'Pomoc'];
    const organisations = ['1', '2', '3', '4'];
    const ages = ['None', '18', '16'];

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div id="container">
            <div id="filters">
                {isOpen && 
                (
                    <>
                        <div id="options">
                            <DatePicker
                                id="datePicker"
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select a date"
                            />
                            
                            <select id="selectInput">
                                <option value="" disabled selected>Location</option>
                                {locations.map((location, index) => (
                                <option key={index} value={location}>
                                    {location}
                                </option>
                                ))}
                            </select>

                            <select id="selectInput">
                                <option value="" disabled selected>Category</option>
                                {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                                ))}
                            </select>

                            <select id="selectInput">
                                <option value="" disabled selected>Organisations</option>
                                {organisations.map((organisation, index) => (
                                <option key={index} value={organisation}>
                                    {organisation}
                                </option>
                                ))}
                            </select>

                            <select id="selectInput">
                                <option value="" disabled selected>Age restrictions</option>
                                {ages.map((age, index) => (
                                <option key={index} value={age}>
                                    {age}
                                </option>
                                ))}
                            </select>
                        </div>
                    </>
                )
                }
                <br />
                <p id="toggle-filters" onClick={handleToggle}> 
                {isOpen ? (
                    <>
                        Schowaj Menu <VscChevronUp />
                    </>
                ) : (
                    <>
                        Rozwiń Menu <VscChevronDown />
                    </>
                )}
                </p>
            </div>

            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
        </div>
    )
};

export default AllEvents;