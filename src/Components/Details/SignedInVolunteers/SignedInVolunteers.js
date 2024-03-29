import { useTranslation } from 'react-i18next';
import '../../../styles/signed-in-volunteers.scss';
import ShiftEntry from './ShiftEntry';

const SignedInVolunteers = () => {
    const { t } = useTranslation();

    return (
        <div className='signed_in_volunteers'>
            <hr />
            <div className='signed_in_volunteers_content'>
                <h2 className='signed_in_volunteers_header'>{t('participants')}</h2>
                <button className='signed_in_volunteers_export_button'>{t('export list')}</button>
            </div>

            <ShiftEntry />
            <ShiftEntry />
            <ShiftEntry />
        </div>
    )
}

export default SignedInVolunteers;