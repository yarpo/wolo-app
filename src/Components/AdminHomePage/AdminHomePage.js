import { useTranslation } from 'react-i18next';
import {useEffect } from 'react';
import '../../styles/admin-home-page.scss';
import { VscEdit, VscArrowRight } from "react-icons/vsc";
import EventCardToModerate from "./EventCardToModerate/EventCardToModerate.js";

const AdminHomePage = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);
    return (
        <div className='admin_home_page_container'>
            <div id="admin_home_page_background_photo">
                <div id="admin_home_page_welcome_text">
                    <div>
                        <h1>{t('hello')} user. {t('welcomeToWoloApp')}</h1>
                    </div>
                    <div>
                        <h2>{t('yourAccountStatus')}: administartor</h2>
                    </div>
                </div>
            </div>
            <div id='admin_home_page_content'>
                <div id="admin_home_page_events_to_approve">
                    <h2>{t('eventsWaitingForApproval')}</h2>
                    <div id="admin_home_page_events_container">
                        <EventCardToModerate />
                        <EventCardToModerate />
                        <EventCardToModerate />
                    </div>
                    <p id="admin_home_page_show_all">{t('showAll')} <VscArrowRight /></p>
                </div>
                <div className='admin_home_page_text'>
                    <h1><VscEdit id="admin_home_page_icon"/> {t('administratorPanel')}</h1>
                </div>
                <div id="admin_home_page_panel">
                    <div className="admin_home_page_panel_column">
                        <h2>{t('eventsSetup')}</h2>
                        <div id="admin_home_page_button">
                            {t('categories')}
                        </div>
                        <div id="admin_home_page_button">
                            {t('roles')}
                        </div>
                        <div id="admin_home_page_button">
                            {t('districts')}
                        </div>
                    </div>
                    <div className="admin_home_page_panel_column">
                        <h2>{t('management')}</h2>
                        <div id="admin_home_page_button">
                            {t('users')}
                        </div>
                        <div id="admin_home_page_button">
                            {t('organisations')}
                        </div>
                        <div id="admin_home_page_button">
                            {t('events')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AdminHomePage;
