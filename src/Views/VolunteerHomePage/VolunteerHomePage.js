import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import YourEventVolunteer from './YourEventVolunteer/YourEventVolunteer.js';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/hero.scss';
import '../../styles/volunteer-home-page.scss';
import formatTime from '../../Utils/formatTime.js';
import fetchUser from '../../Utils/fetchUser.js';
import fetchDataWithAuth from '../../Utils/fetchDataWithAuth.js';
import { URLS } from '../../config.js';
import Hero from '../Hero/Hero.js';

const VolunteerHomePage = () => {
    const { t } = useTranslation();
    const [userEventsCurrent, setUserEventsCurrent] = useState([]);
    const [userEventsPast, setUserEventsPast] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await fetchUser();
            if (userData && userData.id) {
                setUserId(userData.id);
                fetchDataWithAuth(`${URLS.USER_EVENTS_CURRENT}/${userData.id}`, setUserEventsCurrent, localStorage.getItem('token'));
                fetchDataWithAuth(`${URLS.USER_EVENTS_PAST}/${userData.id}`, setUserEventsPast, localStorage.getItem('token'));
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className='volunteer_home_page'>
            <Hero />
            <br />
            <div id="volunteer_home_page_your_events">
                <h2>{t('yourEvents')} </h2>
                <br />
                {userEventsCurrent.map((shift) => (
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
                        city={shift.city} />
                ))}
            </div>
            <div id="volunteer_home_page_your_events">
                <h2>{t('yourEvents')} Archived</h2>
                <br />
                {userEventsPast.map((shift) => (
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
                        city={shift.city} />
                ))}
            </div>
        </div>
    )
};

export default VolunteerHomePage;