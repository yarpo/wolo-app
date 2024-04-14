import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Filters from '../Filters/Filters';
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import YourEventVolunteer from './YourEventVolunteer/YourEventVolunteer.js';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/hero.scss';
import '../../styles/volunteer-home-page.scss';
import formatTime from '../../Utils/formatTime.js';
import fetchUserId from '../../Utils/fetchUserId.js';
import { URLS } from '../../config.js';

const VolunteerHomePage = () => {

    const { t } = useTranslation();
    const locations = ['Zaspa', 'Chełm', 'Wrzeszcz'];
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [  , setFilteredEvents] = useState([]);
    const [userEvents, setUserEvents] = useState([]);
    const [userId, setId] = useState(null);
    
    useEffect(() => {
        const fetchUserData = async () => {
            const userId = await fetchUserId();
            setId(userId);
        };

        fetchUserData();
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    useEffect(() => {
        const fetchUserEvents = async () => {
            if (userId) {
                try {
                    const url = `${URLS.USERS}/${userId}/shifts`;
                    const token = localStorage.getItem('token');
    
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
    
                    const data = await response.json();
                    setUserEvents(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };
    
        fetchUserEvents();
    }, [userId]);
    

    if (!userEvents.length === 0) {
        return <div>{t('loading')}...</div>;
    }

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
                        name={shift.eventName}
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