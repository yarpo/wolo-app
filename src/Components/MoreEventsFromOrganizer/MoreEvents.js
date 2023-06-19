import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import '../../styles/more-events.scss';

const MoreEvents = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  return (
    <div>
      <h3>{t('moreEventsFromThisOrganizer')}</h3>
      <div id="container">
        {/* There will be card components with events from WOLO-35 */}
      </div>
    </div>
  );
};

export default MoreEvents;
