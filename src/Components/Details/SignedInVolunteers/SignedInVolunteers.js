import { useTranslation } from 'react-i18next';
import '../../../styles/signed-in-volunteers.scss';
import ShiftEntry from './ShiftEntry';

const SignedInVolunteers = ({ eventData }) => {
    const { t } = useTranslation();

    

    return (
        <div className='signed_in_volunteers'>
            <hr />
            <div className='signed_in_volunteers_content'>
                <h2 className='signed_in_volunteers_header'>{t('participants')}</h2>
                <button className='signed_in_volunteers_export_button'>{t('export list')}</button>
            </div>

            {eventData && eventData.shifts && eventData.shifts.map((shift, index) => (
            <ShiftEntry 
                key={index}
                id={shift.id}
                startTime={shift.startTime}
                endTime={shift.endTime}
                numVolunteers={shift.signedUp}
                maxVolunteers={shift.capacity}
            />
            ))}
        </div>
    )
}

export default SignedInVolunteers;