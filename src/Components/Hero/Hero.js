import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Filters from '../Filters/Filters';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/hero.scss';

const Hero = () => {

    const { t } = useTranslation();
    const locations = ['Zaspa', 'Chełm', 'Wrzeszcz'];
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [  , setFilteredEvents] = useState([]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    return (
        <div className='hero-container'>
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
                        <div>
                        <DatePicker
                            id="datePicker_hero"
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            placeholderText={t('selectDate')}
                            className="MainInput"
                        />
                        </div>
                       <select 
                            id="selectInput_hero" 
                            className="MainInput" 
                            data-testid="location-select"
                            value={selectedLocation}
                            onChange={handleLocationChange}
                            >
                            <option value="" disabled>{t('location')}</option>
                            {locations.map((location, index) => (
                                <option key={index} value={location}>
                                {location}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
            <div id="filters_hero">
                <Filters setFilteredEvents={setFilteredEvents} />
                <div id="button_hero">
                    <Link to="/events">
                        <input id="hero_submmit_button" type="submit" value={t('mainSearch')} />
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Hero;