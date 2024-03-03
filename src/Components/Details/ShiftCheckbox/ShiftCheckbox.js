import { useTranslation } from 'react-i18next';
import '../../../styles/shift-checkbox.scss';

const ShiftCheckbox = ({ startTime, endTime, numVolunteers, maxVolunteers }) => {

    const { t } = useTranslation();

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