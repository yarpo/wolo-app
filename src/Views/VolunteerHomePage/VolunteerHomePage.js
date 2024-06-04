import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import YourEventVolunteer from './YourEventVolunteer/YourEventVolunteer.js';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/hero.scss';
import '../../styles/volunteer-home-page.scss';
import fetchUser from '../../Utils/fetchUser.js';
import fetchDataWithAuth from '../../Utils/fetchDataWithAuth.js';
import { URLS } from '../../config.js';
import Hero from '../Hero/Hero.js';

const VolunteerHomePage = () => {
    const { t } = useTranslation();
    const [userEventsCurrent, setUserEventsCurrent] = useState([]);
    const [userEventsPast, setUserEventsPast] = useState([]);
    const [userEventsReserve, setUserEventsReserve] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await fetchUser();
            if (userData && userData.id) {
                setUserId(userData.id);
                fetchDataWithAuth(`${URLS.USER_EVENTS_CURRENT}`, setUserEventsCurrent, localStorage.getItem('token'));
                fetchDataWithAuth(`${URLS.USER_EVENTS_PAST}`, setUserEventsPast, localStorage.getItem('token'));
                fetchDataWithAuth(`${URLS.USER_EVENTS_RESERVE}`, setUserEventsReserve, localStorage.getItem('token'));
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
                {userEventsCurrent.length === 0 ? (
                    <p id="volunteer_home_page_text">{t('noCurrentEvents')}</p>
                ) : (
                    userEventsCurrent.map((shift) => (
                        <YourEventVolunteer
                        key={shift.shiftId}
                        shiftId={shift.shiftId}
                        eventId={shift.eventId}
                        userId={userId}
                        shift={shift}
                        isArchived={false} />
                        ))
                    )}
                </div>
            <div id="volunteer_home_page_your_events">
                <h2>{t('yourEventsReserve')} </h2>
                <br />
                {userEventsReserve.length === 0 ? (
                    <p id="volunteer_home_page_text">{t('noReserveEvents')}</p>
                ) : (
                    userEventsReserve.map((shift) => (
                        <YourEventVolunteer
                        key={shift.shiftId}
                        shiftId={shift.shiftId}
                        eventId={shift.eventId}
                        userId={userId}
                        shift={shift}
                        isArchived={false}
                        isReserve={true} />
                        ))
                    )}
            </div>
            <div id="volunteer_home_page_your_events">
                <h2>{t('yourPastEvents')}</h2>
                <br />
                {userEventsPast.length === 0 ? (
                    <p id="volunteer_home_page_text">{t('noPastEvents')}</p>
                ) : (
                    userEventsPast.map((shift) => (
                        <YourEventVolunteer
                            key={shift.shiftId}
                            shiftId={shift.shiftId}
                            eventId={shift.eventId}
                            userId={userId}
                            shift={shift}
                            isArchived={true}
                        />
                    ))
                )}
            </div>
        </div>
    )
};

export default VolunteerHomePage;