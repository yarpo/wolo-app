import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Banner = () => {
    const { t } = useTranslation();
    const isLoggedIn = localStorage.getItem('token') ? true : false;
    const user = JSON.parse(localStorage.getItem('user'))
    

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
                { isLoggedIn && <div id="subtext_hero">
                    <h2>{t('welcome')}</h2>
                </div>}
            </div>
        </>
    );
};

export default Banner;