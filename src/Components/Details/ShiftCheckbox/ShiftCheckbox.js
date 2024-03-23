import { useTranslation } from 'react-i18next';
import '../../../styles/shift-checkbox.scss';
import formatTime from '../../../Utils/formatTime.js';

const ShiftCheckbox = ({ id, startTime, endTime, numVolunteers, maxVolunteers, onChange }) => {

    const { t } = useTranslation();

    const handleShiftChange = (s) => {
        const selected = s.target.checked;
        onChange(selected);
    }

    return (
        <div>
            <div className="shift_checkbox">
                <label htmlFor="shift_hours">
                    <input type='checkbox' id="shift_hours" onChange={handleShiftChange}/>
                    {id}: {formatTime(startTime)} - {formatTime(endTime)}
                </label>
            </div>
            <p id="shift_num_of_volunteers">
                {t('volunteers')}: <strong>{numVolunteers}</strong> / <strong>{maxVolunteers}</strong>
            </p>
        </div>
    );
};

export default ShiftCheckbox;