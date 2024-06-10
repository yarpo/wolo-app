import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VscArrowLeft, VscBrowser, VscOrganization, VscLocation } from 'react-icons/vsc';
import { HiOutlineExclamation } from "react-icons/hi";
import { BiBorderAll } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import '../../styles/details.scss';
import EventCard from '../../Components/EventCard/EventCard.js';
import fetchData from '../../Utils/fetchData.js';
import fetchDataWithAuth from '../../Utils/fetchDataWithAuth.js';
import formatDate from '../../Utils/formatDate.js';
import SignedInVolunteers from './SignedInVolunteers/SignedInVolunteers.js';
import { URLS } from '../../config.js';
import ShiftCard from './ShiftCard/ShiftCard.js';
import fetchUser from '../../Utils/fetchUser.js';
import MapComponent from './MapComponent';

const Details = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [eventData, setEventData] = useState(null);
    const [reportData, setReportData] = useState(null);
    const [organiserEvents, setOrganiserEvents] = useState([]);
    const [roles, setRoles] = useState([]);
    const [userOrganisation, setUserOrganisation] = useState('');
    const [isInPast, setIsInPast] = useState(false);
    const eventDescription = `description${localStorage.getItem('i18nextLng').toUpperCase()}`;
    const eventName = `name${localStorage.getItem('i18nextLng').toUpperCase()}`;
    const reportText = `report${localStorage.getItem('i18nextLng').toUpperCase()}`;

    useEffect(() => {
        fetchUser().then(data => {
            setRoles(data?.roles || []);
            setUserOrganisation(data?.organisationId || '');
        });
    }, []);

    useEffect(() => {
        fetchData(`${URLS.EVENTS}/${id}`, setEventData);
    }, [id]);

    useEffect(() => {
        if (eventData) {
            fetchData(`${URLS.ORGANISATIONS}/${eventData.organisationId}/events`, setOrganiserEvents);
            setIsInPast(new Date(eventData.shifts[0].date) < new Date());

            fetchDataWithAuth(`${URLS.PUBLIC_RAPORT}/${id}`, setReportData, localStorage.getItem('token'));
        }
    }, [eventData, id]);

    if (!eventData) return <div>{t('loading')}...</div>;

    const {
        organisationName, date, city, imageUrl, categories, isPeselVerificationRequired, isAgreementNeeded
    } = eventData;

    const addresses = eventData.shifts.map(shift => ({
        street: shift.street,
        homeNum: shift.homeNum,
        city: city,
        directions: shift[`shiftDirections${localStorage.getItem('i18nextLng').toUpperCase()}`]
    }));

    const isModerator = roles.includes('MODERATOR');
    const isAdmin = roles.includes('ADMIN');
    const isAuthorised = (eventData.organisationId === userOrganisation && isModerator) || isAdmin;

    return (
        <div className="details_container">
            <div id="column">
                <Link to="/events" id="back">
                    <VscArrowLeft id="back_arrow" /> {t('back')}
                </Link>
                <h1 id="title">{eventData[eventName]}</h1>
                <ul id="information">
                    {isPeselVerificationRequired && (
                        <p className='card-extra-requirements'>
                            <HiOutlineExclamation className='card-extra-requirements' /> {t('peselVerificationNeeded')}
                        </p>
                    )}
                    {isAgreementNeeded && (
                        <p className='card-extra-requirements'>
                            <HiOutlineExclamation className='card-extra-requirements' /> {t('volunteerAgreementNeeded')}
                        </p>
                    )}
                    <li><VscBrowser id="icon" /> <strong>{t('date')}:</strong> {formatDate(date)}</li>
                    <li><BiBorderAll id="icon" /> <strong>{t('category')}:</strong> {categories.join(", ")}</li>
                    <li><VscOrganization id="icon" /> <strong>{t('organizer')}:</strong> <Link to={`/organisation?organisationId=${eventData.organisationId}`}>{organisationName}</Link></li>
                    <li><VscLocation id="icon" /> <strong>{t('location')}:</strong> {city}</li>
                </ul>
            </div>
            <div className="details_photo">
                <img src={imageUrl} alt={t('defaultImageForEvent')} onError={(e) => e.target.style.display = 'none'} />
            </div>
            <p id="description">{eventData[eventDescription]}</p>
            {isInPast && (
                <div id="details_event_over">
                    <h2 id="details_event_over_text">{t('eventIsOver')}</h2>
                    <p>{reportData ? reportData[reportText] : ""}</p>
                </div>
            )}
                <div id='column'>
                    <p className="details_shifts_text"><strong>{t('shifts')}:</strong></p>
                    <div className='details_shift_card_container'>
                        <div className='details_shift_card_wrapper'>
                        {eventData.shifts.sort((a, b) => new Date(a.shiftId) - new Date(b.shiftId)).map(shift => (
                            <ShiftCard key={shift.shiftId} shift={shift} city={city} isInPast={isInPast} className='details_shift_card_item' />
                        ))}
                    </div>
                </div>
                <MapComponent addresses={addresses} />
            </div>
            {!isAuthorised && (
                <div id="details_more_events">
                    <h2>{t('moreEventsFromThisOrganizer')}</h2>
                    <div id="details_more_events_container">
                        {organiserEvents.filter(event => new Date(event.date) > new Date()).map(event => (
                            <EventCard key={event.id} event={event} id='details_more_events_item' />
                        ))}
                    </div>
                </div>
            )}
            {isAuthorised && <SignedInVolunteers eventData={eventData} />}
        </div>
    );
};

export default Details;