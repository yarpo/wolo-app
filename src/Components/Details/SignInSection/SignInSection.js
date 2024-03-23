import { useTranslation } from 'react-i18next';
import React from 'react';
import ShiftCheckbox from '../ShiftCheckbox/ShiftCheckbox.js';

const SignInSection = ({ eventData }) => {
    const { t } = useTranslation();

    return (
        <div id="column" className="signin">
        <form action="#">
            <div id="details_shift_checkboxes">
            {eventData && eventData.shifts && eventData.shifts.map((shift, index) => (
                <ShiftCheckbox 
                key={index}
                startTime={shift.startTime}
                endTime={shift.endTime}
                numVolunteers={shift.signedUp}
                maxVolunteers={shift.capacity}
                />
            ))}
            </div>
            <button type="submit" id="sign-in">
            {t('signIn')}
            </button>
        </form>
        </div>
    );
};

export default SignInSection;
