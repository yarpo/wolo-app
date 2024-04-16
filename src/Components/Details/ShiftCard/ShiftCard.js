import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useCallback} from 'react';
import { toast } from 'react-toastify';
import { URLS } from '../../../config.js';
import fetchUserRoles from '../../../Utils/fetchUserRoles.js';
import { Link } from 'react-router-dom';
import fetchUserId from '../../../Utils/fetchUserId.js';
import fetchUserShifts from '../../../Utils/fetchUserShifts.js';
import Confirmation from '../../Popups/Confirmation.js';

const ShiftCard = ({ shift }) => {
    const { t } = useTranslation();
    const [roles, setRoles] = useState(null);
    const [id, setId] = useState(null);
    const shiftId = shift.id;
    const canSignIn = roles && roles.includes('USER');
    const token = localStorage.getItem('token');
    const [userShifts, setUserShifts] = useState([]);
    const isModerator = roles && roles.includes('MODERATOR');
    const isAdmin = roles && roles.includes('ADMIN');
    const [userConfirmed, setUserConfirmed] = useState(false);

    const [confirmPhone, setConfirmPhone] = useState(false);
    const [confirmLeave, setConfirmLeave] = useState(false);
  
    useEffect(() => {
    const fetchUserData = async () => {
      const userRoles = await fetchUserRoles();
      setRoles(userRoles);
      const userId = await fetchUserId();
      setId(userId);
      const userShifts = await fetchUserShifts(userId);
      setUserShifts(userShifts);
    };

    fetchUserData();
  }, []);
  
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
    
    const handleEventInteract = useCallback(() => {
        // function body remains the same
        if (userConfirmed) {  
            const params = new URLSearchParams();
            params.append('user', id);
            params.append('shift', shift.id);
    
            try {
                if (!userShifts.includes(shiftId)) {
                    postRequest(URLS.JOIN, token, params, t('joinShiftSuccess') ,t('joinShiftError'));
                } else {
                    postRequest(URLS.REFUSE, token, params, t('leaveShiftSuccess'), t('leaveShiftError'));
                }
            } catch (error) {
                toast.error('An unexpected error occurred while joining event. Please try again later');
            }
        }
    }, [id, shiftId, userShifts, token, shift, userConfirmed, t]);
    
    useEffect(() => {
        if (userConfirmed !== false) {
            handleEventInteract();
            setUserConfirmed(false);
        }
    }, [userConfirmed, handleEventInteract]); 

    return (
        <div className="card">
            <form onSubmit={(e) => e.preventDefault()}>
                <p>ID: {shift.id}</p>
                <p>Date: {shift.date}</p>
                <p>Time: {shift.startTime} - {shift.endTime}</p>
                <p>Capacity: {shift.capacity}</p>
                <p>Leader Required: {shift.isLeaderRequired ? 'Yes' : 'No'}</p>
                <p>Minimum Age: {shift.requiredMinAge}</p>
                <p>Directions: {shift.shiftDirections}</p>
                <p>Address: {shift.street}, {shift.homeNum}</p>
                <p>District ID: {shift.districtId}</p>
                {canSignIn && !userShifts.includes(shiftId) && <button type="button"  onClick={() => setConfirmPhone(true)} id="sign-in" > {t('signIn')} </button>}
                <Confirmation id="sign-in"
                    buttonName={t('signIn')}
                        title={t('phoneConfirmation')}
                        accept={t('agreeConfirmation')}
                        deny={t('declineConfirmation')}
                        styleId="sign-in"
                        onAgree={() => {
                            handleUserConfirmation(true)
                            handleEventInteract()
                            setConfirmPhone(false)}}
                        onDeny={() => 
                            setConfirmPhone(false)}
                        openModal={confirmPhone}
                        setOpenModal={setConfirmPhone}
                    />
                {canSignIn && userShifts.includes(shiftId) && <button type="button"  onClick={() => setConfirmLeave(true)} id="sign-out">{t('signIn')} </button>}               
                <Confirmation id="sign-in"
                    buttonName={t('signIn')}
                        title={t('leaveShiftConfirmation')}
                        accept={t('agreeToLeave')}
                        deny={t('cancelLeave')} 
                        styleId="sign-out"
                        onAgree={() => {
                            handleUserConfirmation(true)
                            handleEventInteract()
                            setConfirmPhone(false)}}
                        onDeny={() => 
                            setConfirmPhone(false)}
                        openModal={confirmLeave}
                        setOpenModal={setConfirmLeave}
                    />
            </form>

            {!canSignIn && !isAdmin && !isModerator && <p id="sign_in_section_error">{t('volunteersRestricedFunctionality')}. <Link to="/login">{t('signInToday')}</Link></p>}
        </div>
    );
};

export default ShiftCard;
