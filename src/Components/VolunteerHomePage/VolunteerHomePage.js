import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Filters from '../Filters/Filters';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import YourEventVolunteer from './YourEventVolunteer/YourEventVolunteer.js';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/hero.scss';
import '../../styles/volunteer-home-page.scss';
import fetchData from '../../Utils/fetchData.js';
import fetchUserToken from '../../Utils/fetchUserToken.js';

const VolunteerHomePage = () => {

    const { t } = useTranslation();
    const locations = ['Zaspa', 'Chełm', 'Wrzeszcz'];
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [  , setFilteredEvents] = useState([]);
    const [userEvents, setUserEvents] = useState([]);

    const userId = fetchUserToken();

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    useEffect(() => {
        const fetchUserEvents = async () => {
          const url = `http://localhost:8080/users/${userId}/shifts`;
          await fetchData(url, setUserEvents);
        };
    
        fetchUserEvents();
      }, [userId]);

    if (!userEvents) {
        return <div>Loading...</div>;
    }

    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
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
                {userEvents && userEvents.map((shift) => (
                    <YourEventVolunteer 
                        key={shift.shiftId} 
                        name={shift.name}
                        date={shift.date}
                        startTime={formatTime(shift.startTime)}
                        endTime={formatTime(shift.endTime)}
                        street={shift.street}
                        homeNum={shift.homeNum}
                        city={shift.city} />
                ))}
            </div>
        </div>
    )
};

export default VolunteerHomePage;