import { useTranslation } from 'react-i18next';
import '../../../styles/your-event-volunteer.scss';
import { toast } from 'react-toastify';
import { URLS } from '../../../config.js';
import Confirmation from '../../../Components/Popups/Confirmation.js';
import React, { useState, useEffect, useCallback} from 'react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import formatDate from '../../../Utils/formatDate.js';
import formatTime from '../../../Utils/formatTime.js';

const YourEventVolunteer = ({shiftId, eventId, userId, shift, isArchived, isReserve}) => {
    const { t } = useTranslation();
    const eventName = `eventName${localStorage.getItem('i18nextLng').toUpperCase()}`;
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
                    {shift[eventName]}
                </Link>
            </div>
            <div className="your_event_volunteer_event_item" id="your_event_volunteer_event_date">
                {formatDate(shift.date)}
            </div>
            <div className="your_event_volunteer_event_item"  id="your_event_volunteer_event_date">
                {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
            </div>
            <div className="your_event_volunteer_event_item"  id="your_event_volunteer_event_address">
                {shift.street} {shift.homeNum}, {shift.city}
            </div>

            {!isArchived && !isReserve && <Button type="button" size="xl" onClick={() => setConfirmLeave(true)} id="your_event_volunteer_event_sign_off_button"> {t('leaveShift')} </Button>}         
            {!isArchived && isReserve && <Button type="button" size="xl" onClick={() => setConfirmLeave(true)} id="your_event_volunteer_event_sign_off_button"> {t('leaveShift')} </Button>}         
                <Confirmation id="sign-in"
                    buttonName={t('logIn')}
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