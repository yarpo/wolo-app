import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import '../../styles/admin-home-page.scss';

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
            <div>
                Events waiting for approval
            </div>
            <div>
                Administrator panel
            </div>
            <div id="admin_home_page_panel">
                <div className="admin_home_page_panel_column">
                    <h2>Events setup</h2>
                </div>
                <div className="admin_home_page_panel_column">
                    <h2>Management</h2>
                </div>
            </div>
        </div>
    )
};

export default AdminHomePage;
