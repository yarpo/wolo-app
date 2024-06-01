"use client";

import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { URLS } from '../../../config.js';
import { Link } from 'react-router-dom';
import fetchUser from '../../../Utils/fetchUser.js'; 
import postRequest from '../../../Utils/postRequest.js';
import Confirmation from '../../../Components/Popups/Confirmation.js';
import { Card } from "flowbite-react";
import { HiOutlineExclamation } from "react-icons/hi";
import formatTime from '../../../Utils/formatTime.js';

const ShiftCard = ({ shift, city, isInPast }) => {
    const { t } = useTranslation();
    const shiftDirections = `shiftDirections${localStorage.getItem('i18nextLng').toUpperCase()}`;
    const [roles, setRoles] = useState(null);
    const [id, setId] = useState(null);
    const shiftId = shift.shiftId;
    const canSignIn = roles && roles.includes('USER');
    const token = localStorage.getItem('token');
    const [userShifts, setUserShifts] = useState([]);
    const isModerator = roles && roles.includes('MODERATOR');
    const isAdmin = roles && roles.includes('ADMIN');
    const isFull = shift.registeredUsers === shift.capacity;
    const [userConfirmed, setUserConfirmed] = useState(false);

    const [confirmPhone, setConfirmPhone] = useState(false);
    const [confirmLeave, setConfirmLeave] = useState(false);

    useEffect(() => {
        fetchUser().then(data => {
          if (data) {
            setRoles(data.roles);
            setId(data.id);
            setUserShifts(data.shifts.map(shift => shift.id))
          }
        })
      }, []);
  
    const handleUserConfirmation = async (confirmation) => {
        setUserConfirmed(confirmation);
    };
    
    const handleEventInteract = useCallback(() => {
        if (userConfirmed) {  
            const params = new URLSearchParams();
            params.append('user', id);
            params.append('shift', shift.shiftId);
    
            try {
                if (!userShifts.includes(shiftId)) {
                    postRequest(URLS.JOIN, token, params, t('joinShiftSuccess'), t('joinShiftError'));
                } else {
                    postRequest(URLS.REFUSE, token, params, t('leaveShiftSuccess'), t('leaveShiftError'));
                }
            } catch (error) {
                toast.error( t('unknownError') );
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
        <Card className="shift_card">
            <span className="font-normal text-gray-700 dark:text-gray-400">
                <p><strong>{t('time')}:</strong> {formatTime(shift.startTime)} - {formatTime(shift.endTime)}</p>
                <p><strong>{t('volunteers')}:</strong> {shift.registeredUsers} / {shift.capacity}</p>
                <p><strong>{shift.district}, {city}</strong></p>
                <p><strong> {shift.street} {shift.homeNum}</strong></p>
                <p>{shift[shiftDirections]}</p>
                {shift.requiredMinAge && shift.requiredMinAge > 0 && (
                    <p className='card-extra-requirements'> 
                        <HiOutlineExclamation className='card-extra-requirements'/> {t('ageRestrictions')}: {shift.requiredMinAge}
                    </p>
                )}
            </span>
            <div className='shift_card_buttons'>
                {!isInPast && <form onSubmit={(e) => e.preventDefault()}>
                    {canSignIn && !isFull && !userShifts.includes(shiftId) && <button type="button"  onClick={() => setConfirmPhone(true)} id="sign-in" > {t('joinShift')} </button>}
                    <Confirmation id="sign-in"
                        buttonName={t('joinShift')}
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
                    {canSignIn && userShifts.includes(shiftId) && <button type="button"  onClick={() => setConfirmLeave(true)} id="sign-out">{t('leaveShift')} </button>}               
                    <Confirmation id="sign-off"
                        buttonName={t('leaveShift')}
                            title={t('leaveShiftConfirmation')}
                            accept={t('agreeToLeave')}
                            deny={t('cancelLeave')} 
                            styleId="sign-out"
                            onAgree={() => {
                                handleUserConfirmation(true)
                                handleEventInteract()
                                setConfirmLeave(false)}}
                            onDeny={() => 
                                setConfirmLeave(false)}
                            openModal={confirmLeave}
                            setOpenModal={setConfirmLeave}
                        />
                    {!canSignIn && !isAdmin && !isModerator && <p id="sign_in_section_error">{t('volunteersRestricedFunctionality')}. <Link to="/login">{t('logInToday')}</Link></p>}
                </form>}
            </div>
        </Card>
    );
};

export default ShiftCard;