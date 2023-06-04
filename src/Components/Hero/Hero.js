import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './Hero.css';

const Hero = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);
    const [isOpen, setIsOpen] = useState(false);

    const locations = ['Zaspa', 'Chełm', 'Wrzeszcz'];



    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    return (
        <div>
            <form>
                <div id="mainContainer">
                    <div id="background">
                        <div id="containerHero">
                            <h1>{t('welcome')}</h1>

                        </div>

                        <div id="subtext">
                            <h2><Link to="/login">{t('signInToday')}</Link> {t('or')} <Link to="/events">{t('findEvent')}</Link></h2>
                        </div>
                    </div>

                    <div id="MainRow">
                        <DatePicker
                            id="datePicker"
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select a date"
                            class="MainInput"
                        />
                        <select id="selectInput" class="MainInput">
                            <option value="" disabled selected>Location</option>
                            {locations.map((location, index) => (
                                <option key={index} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <Link to="/events">
                    <div id="button">
                        <input type="submit" value={t('MainSearch')} />
                    </div>
                </Link>


            </form>
        </div>
    )
};

export default Hero;