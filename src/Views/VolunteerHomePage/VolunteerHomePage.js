import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import YourEventVolunteer from './YourEventVolunteer/YourEventVolunteer.js';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/hero.scss';
import '../../styles/volunteer-home-page.scss';
import formatTime from '../../Utils/formatTime.js';
import fetchUserId from '../../Utils/fetchUserId.js';
import { URLS } from '../../config.js';
import Hero from '../Hero/Hero.js';

const VolunteerHomePage = () => {

    const { t } = useTranslation();
    const [userEvents, setUserEvents] = useState([]);
    const [userId, setId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = await fetchUserId();
            setId(userId);
        };

        fetchUserData();
    }, []);

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
            <Hero />
            <br />
            <div id="volunteer_home_page_your_events">
                <h2>{t('yourEvents')} </h2>
                <br />
                {userEvents && userEvents.map((shift) => (
                    <YourEventVolunteer
                        key={shift.shiftId}
                        shiftId={shift.shiftId}
                        userId={userId}
                        name={shift.eventName}
                        date={shift.date}
                        startTime={formatTime(shift.startTime)}
                        endTime={formatTime(shift.endTime)}
                        street={shift.street}
                        homeNum={shift.homeNum}
                        district={shift.district} />
                ))}
            </div>
        </div>
    )
};

export default VolunteerHomePage;