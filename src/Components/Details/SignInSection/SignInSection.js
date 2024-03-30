import { useTranslation } from 'react-i18next';
import React, {useState} from 'react';
import ShiftCheckbox from '../ShiftCheckbox/ShiftCheckbox.js';
import fetchUserToken from '../../../Utils/fetchUserToken.js';
import { toast } from 'react-toastify';
import { URLS } from '../../../config.js'

const SignInSection = ({ eventData }) => {
    const { t } = useTranslation();
    const [selectedShifts, setSelectedShifts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    
const handleShiftCheckboxChange = (shiftId, selected) => {
    if (selected) {
      setSelectedShifts((allSelectedShifts) => [...allSelectedShifts, shiftId]);
    } else {
      setSelectedShifts((allSelectedShifts) => allSelectedShifts.filter((id) => id !== shiftId));
    }
  }
  
  const handleJoinEvent = async (e) => {
    e.preventDefault();
  
    if (selectedShifts.length === 0) {
      setErrorMessage('Please select at least one shift to sign in.');
      return;
    }
    setErrorMessage('');
  
    const userConfirmed = window.confirm('I agree to give my phone number to the organizer.');
  
    if (userConfirmed) {
      const userId = fetchUserToken();
  
      for (const shiftId of selectedShifts) {
        const params = new URLSearchParams();
        params.append('user', userId);
        params.append('shift', shiftId);
  
        try {
          const response = await fetch(`${URLS.JOIN}?${params.toString()}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            console.log(`Successfully joined shift ${shiftId}`);
            toast.success(`Successfully joined shift`);
          } else {
            console.error(`Failed to join shift ${shiftId}`);
            toast.error(`Failed to join shift`);
          }
        } catch (error) {
          console.error(`Error joining shift ${shiftId}:`, error);
          toast.error('An unexpected error occurred while joining event. Please try again later');
        }
      }
    }
  }

    return (
        <div id="column" className="signin">
        <form onSubmit={handleJoinEvent}>
        <div id="details_shift_checkboxes">
            {eventData && eventData.shifts && eventData.shifts.map((shift, index) => (
            <ShiftCheckbox 
                key={index}
                id={shift.id}
                startTime={shift.startTime}
                endTime={shift.endTime}
                numVolunteers={shift.signedUp}
                maxVolunteers={shift.capacity}
                onChange={(selected) => handleShiftCheckboxChange(shift.id, selected)}
            />
            ))}
        </div>
        <button type="submit" id="sign-in">
            {t('signIn')}
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
        </div>

    );
};

export default SignInSection;
