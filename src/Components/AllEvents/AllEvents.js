import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { VscChevronDown, VscChevronUp, VscClose } from 'react-icons/vsc';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EventCard from '../EventCard/EventCard';
import './AllEvents.css';

import eventData from '../../eventsData.json';

const AllEvents = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const [filters, setFilters] = useState({
        selectedDate: null,
        chosenTags: [],
        requiresVerification: false,
        hideFullyBookedEvents: false,
        selectedAge: ''
    });

    const locations = [...new Set(eventData.map((event) => event.location))];
    const categories = [...new Set(eventData.map((event) => event.category))];
    const organisations = [...new Set(eventData.map((event) => event.organizedBy))];
    const ages = [...new Set(eventData.map((event) => event.ageRestrictions))];

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleDateChange = (date) => {
        setFilters({ ...filters, selectedDate: date });
    };

    const handleTagChange = (event) => {
        const { value } = event.target;
        if (!filters.chosenTags.includes(value)) {
            setFilters({ ...filters, chosenTags: [...filters.chosenTags, value] });
        }
    };

    const handleTagRemove = (tag) => {
        setFilters({
            ...filters,
            chosenTags: filters.chosenTags.filter((chosenTag) => chosenTag !== tag)
        });
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFilters({ ...filters, [name]: checked });
    };

    const handleAgeChange = (event) => {
        const { value } = event.target;
        setFilters({ ...filters, selectedAge: value });
    };

    const filteredEvents = eventData.filter((event) => {
        const isMatchingTag = filters.chosenTags.some((tag) =>
            [event.location, event.category, event.organizedBy, event.age].includes(tag)
        );

        const isMatchingDate =
            filters.selectedDate === null || new Date(event.date) >= filters.selectedDate;

        const isMatchingVerification =
            !filters.requiresVerification || event.requiresVerification === false;

        const isMatchingBooking =
            !filters.hideFullyBookedEvents || event.participantsSignedIn < event.participantsNeeded;

        const isMatchingAge =
            filters.selectedAge === '' || parseInt(event.ageRestrictions) >= parseInt(filters.selectedAge);


        return (
            (filters.chosenTags.length === 0 || isMatchingTag) &&
            isMatchingDate &&
            isMatchingVerification &&
            isMatchingBooking &&
            isMatchingAge
        );
    });

    return (
        <div id="container">
            <div id="filters">
                {isOpen && (
                    <>
                        <div id="options">
                            <DatePicker
                                id="datePickerr"
                                selected={filters.selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                placeholderText={t('date')}
                            />
                            {[
                                { label: t('location'), options: locations },
                                { label: t('category'), options: categories },
                                { label: t('organisations'), options: organisations }
                            ].map((filter, index) => (
                                <select
                                    key={index}
                                    id="selectInputt"
                                    onChange={handleTagChange}
                                    value=""
                                    disabled={!isOpen}
                                >
                                    <option value="" disabled selected>
                                        {filter.label}
                                    </option>
                                    {filter.options.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            ))}

                            <select
                                id="selectInputt"
                                onChange={handleAgeChange}
                                value={filters.selectedAge}
                                disabled={!isOpen}
                            >
                                <option value="" disabled>
                                    {t('ageRestrictions')}
                                </option>
                                {ages.map((age, index) => (
                                    <option key={index} value={age}>
                                        {age}
                                    </option>
                                ))}
                            </select>
                            <br />
                        </div>
                        <div className="checkbox-container">
                            <label className="select-boolean">
                                {t('noVolunteerVerificationRequired')}
                                <input
                                    type="checkbox"
                                    className="checkbox-round"
                                    name="requiresVerification"
                                    checked={filters.requiresVerification}
                                    onChange={handleCheckboxChange}
                                    disabled={!isOpen}
                                />
                            </label>
                            <label className="select-boolean" htmlFor="booked">
                                {t('hideFullyBookedEvents')}
                                <input
                                    type="checkbox"
                                    className="checkbox-round"
                                    id="booked"
                                    name="hideFullyBookedEvents"
                                    checked={filters.hideFullyBookedEvents}
                                    onChange={handleCheckboxChange}
                                    disabled={!isOpen}
                                />
                            </label>
                        </div>
                        <ul className="chosen-tags-container">
                            {filters.chosenTags.map((tag, index) => (
                                <li key={index} className="chosen-tags">
                                    {tag}{' '}
                                    <VscClose
                                        className="icon"
                                        onClick={() => handleTagRemove(tag)}
                                    />
                                </li>
                            ))}
                        </ul>
                    </>
                )}
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

            {/* Generate event cards */}
            {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
};

export default AllEvents;
