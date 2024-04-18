import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../styles/hero.scss';
import fetchUserRoles from '../../Utils/fetchUserRoles.js';

const WelcomingBanner = ({ isOrganizerPage }) => {
    const { t } = useTranslation();
    const isLoggedIn = localStorage.getItem('token') ? true : false;
    const user = JSON.parse(localStorage.getItem('user'));
    const [roles, setRoles] = useState(null);
    const isModerator = roles && roles.includes('MODERATOR');

    useEffect(() => {
        const fetchUserData = async () => {
          const userRoles = await fetchUserRoles();
          setRoles(userRoles);
        };
    
        fetchUserData();
      }, []);
    

    return (
        <>
        <div id="background_hero">
                { !isLoggedIn && <div id="containerHero_hero">
                    <h1>{t('welcome')}</h1>
                </div>}
                { isLoggedIn && <div id="containerHero_hero">
                    <h1>{t('hello')}, {user.firstName}. {t('welcomeToWoloApp')}</h1>
                </div>}
                { !isLoggedIn && <div id="subtext_hero">
                    <h2><Link to="/login">{t('signInToday')}</Link> {t('or')} <Link to="/events">{t('findEvent')}</Link></h2>
                </div>}
                { isLoggedIn && !isOrganizerPage && <div id="subtext_hero">
                    <h2>{t('welcome')}</h2>
                </div>}
                { isModerator && isOrganizerPage && <div id="subtext_hero">
                    <h2>{t('welcome')}AAA</h2>
                </div>}
            </div>
        </>
    );
};

export default WelcomingBanner;