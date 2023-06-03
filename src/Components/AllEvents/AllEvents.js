import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { VscChevronDown, VscChevronUp, VscClose } from "react-icons/vsc";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EventCard from '../EventCard/EventCard';
import './AllEvents.css';

const AllEvents = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const chosenTags = ['Chełm', 'Wrzeszcz', 'Education', 'Sport'];

    const locations = ['Zaspa', 'Chełm', 'Wrzeszcz'];
    const categories = ['Edukacja', 'Sport', 'Kultura', 'Pomoc'];
    const organisations = ['1', '2', '3', '4'];
    const ages = ['None', '18', '16'];

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
          i18n.changeLanguage(storedLanguage);
        }
      }, [i18n]);

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
                                placeholderText={t('date')}
                            />
                            
                            <select id="selectInput">
                                <option value="" disabled selected>{t('location')}</option>
                                {locations.map((location, index) => (
                                <option key={index} value={location}>
                                    {location}
                                </option>
                                ))}
                            </select>

                            <select id="selectInput">
                                <option value="" disabled selected>{t('category')}</option>
                                {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                                ))}
                            </select>

                            <select id="selectInput">
                                <option value="" disabled selected>{t('organisations')}</option>
                                {organisations.map((organisation, index) => (
                                <option key={index} value={organisation}>
                                    {organisation}
                                </option>
                                ))}
                            </select>

                            <select id="selectInput">
                                <option value="" disabled selected>{t('ageRestrictions')}</option>
                                {ages.map((age, index) => (
                                <option key={index} value={age}>
                                    {age}
                                </option>
                                ))}
                            </select>
                            <br/>
                        </div>
                        <div className='checkbox-container'>
                            <label className='select-boolean'>
                                    {t('noVolunteerVerificationRequired')}
                                     <input type='checkbox' className='checkbox-round'/> 
                            </label>
                            <label className='select-boolean' for='booked'>
                                    {t('hideFullyBookedEvents')} 
                                     <input type='checkbox' className='checkbox-round' id="booked"/> 
                            </label>
                        </div>
                        <ul class="chosen-tags-container">
                            {chosenTags.map((tag, index) => (
                                <li key={index} className="chosen-tags">{tag} <VscClose class="icon"/></li>
                            ))}
                        </ul>
                    </>
                )
                }
                <br />
                <p id="toggle-filters" onClick={handleToggle}> 
                {isOpen ? (
                    <>
                        {t('hideFilters')} <VscChevronUp />
                    </>
                ) : (
                    <>
                        {t('showFilters')} <VscChevronDown />
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