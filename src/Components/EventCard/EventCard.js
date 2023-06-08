import React from 'react';
import { useTranslation } from 'react-i18next';
import { VscLocation, VscBrowser, VscOrganization } from 'react-icons/vsc';
import { BiTime } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import logo from '../../images/event-img.jpg';
import './EventCard.css';

const EventCard = ({ event }) => {
    const { t } = useTranslation();

    return (
        <Link to="/details" style={{ textDecoration: 'none' }}>
            <div className="card">
                <div id="card-img">
                    <img src={logo} alt={event.title} />
                </div>
                <div id="information">
                    <h2>{event.title}</h2>
                    <ul>
                        <li>
                            <VscLocation className="icon" /> <strong>{t('location')}:</strong> {event.location}
                        </li>
                        <li>
                            <VscBrowser className="icon" /> <strong>{t('date')}:</strong> {event.date}
                        </li>
                        <li>
                            <BiTime className="icon" /> <strong>{t('time')}:</strong> {event.time}
                        </li>
                        <li>
                            <VscOrganization className="icon" /> <strong>{t('organizedBy')}:</strong> {event.organizedBy}
                        </li>
                        <li>
                            <strong>{t('needed')}:</strong> {event.participantsNeeded}
                        </li>
                        <li>
                            <strong>{t('signedIn')}:</strong> {event.participantsSignedIn}
                        </li>
                    </ul>
                </div>
            </div>
        </Link>
    );
};

export default EventCard;
