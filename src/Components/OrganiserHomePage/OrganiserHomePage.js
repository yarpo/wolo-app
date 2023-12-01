import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import '../../styles/organiser-home-page.scss';

const OrganiserHomePage = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

    return (
        <div className='organiser_home_page_container'>
            <div id="background_photo">
                <div id="welcome_text">
                    <div>
                        <h1>Hello user, are you ready to change the world?</h1>
                    </div>
                    <div>
                        <h2>Your organisation: schronisko przyjazna łapa</h2>
                    </div>
                </div>
                <div>
                    <form>
                        create event
                    </form>
                </div>
            </div>
            <div>
                Your events
            </div>
            <div>
                Events in moderation
            </div>
        </div>
    )
};

export default OrganiserHomePage;
