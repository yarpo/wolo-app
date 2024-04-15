import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
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
  
const postRequest = async (url, token, params) => {
    const response = await fetch(`${url}?${params.toString()}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        toast.success(`Successfully joined the shift`);
        window.location.reload();
    } else {
        toast.error(`Failed to join the shift`);
    }
};

const handleUserConfirmation = async (confirmation) => {
    await setUserConfirmed(confirmation);
};

  const handleEventInteract = async (e) => {
    e.preventDefault();
  
    await handleUserConfirmation(userConfirmed);

   console.log(userConfirmed);
    if (userConfirmed) {  
        const params = new URLSearchParams();
        params.append('user', id);
        params.append('shift', shift.id);

        try {
            if (!userShifts.includes(shiftId) ) {
                await postRequest(URLS.JOIN, token, params);
            } else {
                await postRequest(URLS.REFUSE, token, params);
            }
        } catch (error) {
            toast.error('An unexpected error occurred while joining event. Please try again later');
        }
    }
  }

    return (
        <div className="card">
            <form onSubmit={handleEventInteract}>
                <p>ID: {shift.id}</p>
                <p>Date: {shift.date}</p>
                <p>Time: {shift.startTime} - {shift.endTime}</p>
                <p>Capacity: {shift.capacity}</p>
                <p>Leader Required: {shift.isLeaderRequired ? 'Yes' : 'No'}</p>
                <p>Minimum Age: {shift.requiredMinAge}</p>
                <p>Directions: {shift.shiftDirections}</p>
                <p>Address: {shift.street}, {shift.homeNum}</p>
                <p>District ID: {shift.districtId}</p>
                {canSignIn && !userShifts.includes(shiftId) &&  
                <Confirmation id="sign-in"
                    buttonName={t('signIn')}
                        title="I agree to give my phone number to the organiser."
                        accept="Yes"
                        deny="No" 
                        onResult={handleUserConfirmation}
                        styleId="sign-in"
                    />}
                {canSignIn && userShifts.includes(shiftId) &&                
                <Confirmation id="sign-in"
                    buttonName={t('signIn')}
                        title="Are you sure you want to leave this shift?"
                        accept="Yes"
                        deny="No" 
                        onResult={handleUserConfirmation}
                        styleId="sign-out"
                    />}
            </form>

            {!canSignIn && !isAdmin && !isModerator && <p id="sign_in_section_error">{t('volunteersRestricedFunctionality')}. <Link to="/login">{t('signInToday')}</Link></p>}
        </div>
    );
};

export default ShiftCard;
