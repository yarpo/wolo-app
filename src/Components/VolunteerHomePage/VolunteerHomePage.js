import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Filters from '../Filters/Filters';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import YourEventVolunteer from './YourEventVolunteer/YourEventVolunteer.js';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/hero.scss';
import '../../styles/volunteer-home-page.scss';

const VolunteerHomePage = () => {

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
        <div className='volunteer_home_page'>
            <div className='hero-container'>
                <form id="form_hero">
                    <div id="mainContainer_hero">
                        <div id="background_hero">
                            <div id="containerHero_hero">
                                <h1>{t('hello')} user! {t('welcomeToWoloApp')}</h1>
                            </div>
                            <div id="subtext_hero">
                                <h2>{t('yourAccountStatus')}: leader</h2>
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
                            <input type="submit" value={t('mainSearch')} />
                        </Link>
                    </div>
                </div>
            </div>
            <br />
            <div id="volunteer_home_page_your_events">
                <h2>{t('yourEvents')} </h2>
                <br />
                <YourEventVolunteer />
                <YourEventVolunteer />
                <YourEventVolunteer />
            </div>
        </div>
    )
};

export default VolunteerHomePage;