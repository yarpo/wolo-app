import { useTranslation } from 'react-i18next';
import '../../styles/more-events.scss';

const MoreEvents = () => {

  const { t } = useTranslation();

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