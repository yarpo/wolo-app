import { useTranslation } from 'react-i18next';
import '../../../styles/your-event-volunteer.scss';
import { toast } from 'react-toastify';
import { URLS } from '../../../config.js';
import Confirmation from '../../../Components/Popups/Confirmation.js';
import React, { useState, useEffect, useCallback} from 'react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

const YourEventVolunteer = ({shiftId, eventId, userId, name, date, startTime, endTime, street, homeNum, isArchived}) => {

    const { t } = useTranslation();
    const token = localStorage.getItem('token');
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [confirmLeave, setConfirmLeave] = useState(false);
    const postRequest = async (url, token, params, success, error) => {
        const response = await fetch(`${url}?${params.toString()}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            toast.success(`${success}`);
            window.location.reload();
        } else {
            toast.error(`${error}`);
        }
    };

    const handleUserConfirmation = async (confirmation) => {
        setUserConfirmed(confirmation);
    };
    
    const handleLeaveEvent = useCallback(() => {
        if (userConfirmed) {  
            const params = new URLSearchParams();
            params.append('user', userId);
            params.append('shift', shiftId);

            try {
                    postRequest(URLS.REFUSE, token, params, t('leaveShiftSuccess'), t('leaveShiftError'));
            } catch (error) {
                toast.error( t('unknownError') );
            }
        }
    }, [userId, shiftId, token, userConfirmed, t]);
    
    useEffect(() => {
        if (userConfirmed !== false) {
            handleLeaveEvent();
            setUserConfirmed(false);
        }
    }, [userConfirmed, handleLeaveEvent]); 


    return (
        <form onSubmit={handleLeaveEvent}>
        <div className='your_event_volunteer'>
            <div className="your_event_volunteer_event_item" id="your_event_volunteer_event_name">
                <Link to={`${URLS.DETAILS}/${eventId}`}>
                    {name}
                </Link>
            </div>
            <div className="your_event_volunteer_event_item" id="your_event_volunteer_event_date">
                {date}
            </div>
            <div className="your_event_volunteer_event_item"  id="your_event_volunteer_event_date">
                {startTime} - {endTime}
            </div>
            <div className="your_event_volunteer_event_item"  id="your_event_volunteer_event_address">
                {street} {homeNum}
            </div>

            {!isArchived && <Button type="button"  onClick={() => setConfirmLeave(true)} id="your_event_volunteer_event_sign_off_button">{t('signOff')} </Button>}         
                <Confirmation id="sign-in"
                    buttonName={t('signIn')}
                        title={t('leaveShiftConfirmation')}
                        accept={t('agreeToLeave')}
                        deny={t('cancelLeave')} 
                        styleId="sign-out"
                        onAgree={() => {
                            handleUserConfirmation(true)
                            handleLeaveEvent()}}
                        onDeny={() => 
                            setConfirmLeave(false)}
                        openModal={confirmLeave}
                        setOpenModal={setConfirmLeave}
                    />
            </div>
        </form>)
};

export default YourEventVolunteer;