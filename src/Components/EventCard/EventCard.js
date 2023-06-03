import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { VscBrowser, VscOrganization, VscLocation } from "react-icons/vsc";
import { BiTime } from "react-icons/bi";
import './EventCard.css';

const EventCard = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
        i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

    return (
        <div className="card">
            <img src="#" />
            <div id="information">
                <h2>Event title will go there...</h2>
                <ul>
                    <li><VscLocation className="icon"/> <strong>{t('location')}:</strong> </li>
                    <li><VscBrowser className="icon"/> <strong>{t('date')}:</strong> </li>
                    <li><BiTime className="icon"/> <strong>{t('time')}:</strong> </li>
                    <li><VscOrganization className="icon"/> <strong>{t('organizedBy')}:</strong> </li>
                    <li><strong>{t('needed')}:</strong> X</li>
                    <li><strong>{t('signedIn')}:</strong> X</li>
                </ul>
            </div>
        </div>
    )
};

export default EventCard;