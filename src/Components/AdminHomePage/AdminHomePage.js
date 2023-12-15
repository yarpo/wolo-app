import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
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
                        <h1>{t('hello')} user. Welcome to WoloApp</h1>
                    </div>
                    <div>
                        <h2>Your account status: administartor</h2>
                    </div>
                </div>
            </div>
            <div id='admin_home_page_content'>
                <div id="admin_home_page_events_to_approve">
                    <h2>Events waiting for approval</h2>
                    <div id="admin_home_page_events_container">
                        <EventCardToModerate />
                        <EventCardToModerate />
                        <EventCardToModerate />
                    </div>
                    <p id="admin_home_page_show_all">Show all <VscArrowRight /></p>
                </div>
                <div className='admin_home_page_text'>
                    <h1><VscEdit id="admin_home_page_icon"/> Administrator panel</h1>
                </div>
                <div id="admin_home_page_panel">
                    <div className="admin_home_page_panel_column">
                        <h2>Events setup</h2>
                        <div id="admin_home_page_button">
                            Categories
                        </div>
                        <div id="admin_home_page_button">
                            Districts
                        </div>
                        <div id="admin_home_page_button">
                            Roles
                        </div>
                    </div>
                    <div className="admin_home_page_panel_column">
                        <h2>Management</h2>
                        <div id="admin_home_page_button">
                            Users
                        </div>
                        <div id="admin_home_page_button">
                            Organisations
                        </div>
                        <div id="admin_home_page_button">
                            Events
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AdminHomePage;
