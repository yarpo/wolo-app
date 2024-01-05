import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import '../../../styles/shift-checkbox.scss';

const ShiftCheckbox = ({ startTime, endTime, numVolunteers, maxVolunteers }) => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

    return (
        <div>
            <div className="shift_checkbox">
                <label htmlFor="shift_hours">
                    <input type='checkbox' id="shift_hours" />
                    {startTime} - {endTime}
                </label>
            </div>
            <p id="shift_num_of_volunteers">
                {t('volunteers')}: <strong>{numVolunteers}</strong> / <strong>{maxVolunteers}</strong>
            </p>
        </div>
    );
};

export default ShiftCheckbox;
