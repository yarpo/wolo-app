import React, { useState } from 'react';
import EventCard from '../EventCard/EventCard';
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import './AllEvents.css';


const AllEvents = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div id="container">
            <div id="filters">
                {isOpen && <p>This is menu</p>}
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