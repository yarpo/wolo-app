import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/hero.scss';

const Hero = () => {
    const { t, i18n } = useTranslation();
    const locations = ['Zaspa', 'Chełm', 'Wrzeszcz'];
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <form id="form_hero">
                <div id="mainContainer_hero">
                    <div id="background_hero">
                        <div id="containerHero_hero">
                            <h1>{t('welcome')}</h1>
                        </div>
                        <div id="subtext_hero">
                            <h2><Link to="/login">{t('signInToday')}</Link> {t('or')} <Link to="/events">{t('findEvent')}</Link></h2>
                        </div>
                    </div>
                    <div id="MainRow_hero">
                        <DatePicker
                            id="datePicker_hero"
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select a date"
                            class="MainInput"
                        />
                        <select id="selectInput_hero" className="MainInput">
                            <option value="" disabled selected>Location</option>
                            {locations.map((location, index) => (
                                <option key={index} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div id="button_hero">
                    <Link to="/events">
                        <input type="submit" value={t('MainSearch')} />
                    </Link>
                </div>
            </form>
        </div>
    )
};

export default Hero;