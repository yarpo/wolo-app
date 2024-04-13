import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { URLS } from '../../../config.js';
import fetchUserRoles from '../../../Utils/fetchUserRoles.js';
import { Link } from 'react-router-dom';
import fetchUserId from '../../../Utils/fetchUserId.js';
import fetchUserShifts from '../../../Utils/fetchUserShifts.js';

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
  
  const handleJoinEvent = async (e) => {
    e.preventDefault();
  
    const userConfirmed = window.confirm('I agree to give my phone number to the organizer.');
  
    if (userConfirmed) {  
        const params = new URLSearchParams();
        params.append('user', id);
        params.append('shift', shift.id);

        try {
            const response = await fetch(`${URLS.JOIN}?${params.toString()}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            });

            if (response.ok) {
            toast.success(`Successfully joined shift`);
            window.location.reload();
            } else {
            toast.error(`Failed to join shift`);
            }
        } catch (error) {
            toast.error('An unexpected error occurred while joining event. Please try again later');
        }
    }
  }

    return (
        <div className="card">
            <form onSubmit={handleJoinEvent}>
                <p>ID: {shift.id}</p>
                <p>Date: {shift.date}</p>
                <p>Time: {shift.startTime} - {shift.endTime}</p>
                <p>Capacity: {shift.capacity}</p>
                <p>Leader Required: {shift.isLeaderRequired ? 'Yes' : 'No'}</p>
                <p>Minimum Age: {shift.requiredMinAge}</p>
                <p>Directions: {shift.shiftDirections}</p>
                <p>Address: {shift.street}, {shift.homeNum}</p>
                <p>District ID: {shift.districtId}</p>
                {canSignIn && !userShifts.includes(shiftId) && <button type="submit" id="sign-in">
                    {t('signIn')}
                </button>}
                {/* Sign Off - WOLO-183 */}
                {canSignIn && userShifts.includes(shiftId) && <button id="sign-out">
                    {t('signOff')}
                </button>}
            </form>

            {!canSignIn && !isAdmin && !isModerator && <p id="sign_in_section_error">{t('volunteersRestricedFunctionality')}. <Link to="/login">{t('signInToday')}</Link></p>}
        </div>
    );
};

export default ShiftCard;
