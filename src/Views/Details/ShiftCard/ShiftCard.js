"use client";

import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { URLS } from '../../../config.js';
import fetchUserRoles from '../../../Utils/fetchUserRoles.js';
import { Link } from 'react-router-dom';
import fetchUserId from '../../../Utils/fetchUserId.js';
import fetchUserShifts from '../../../Utils/fetchUserShifts.js';
import postRequest from '../../../Utils/postRequest.js';
import Confirmation from '../../../Components/Popups/Confirmation.js';
import { Card } from "flowbite-react";
import formatDate from '../../../Utils/formatDate.js';
import formatTime from '../../../Utils/formatTime.js';

const ShiftCard = ({ shift, city }) => {
    const { t } = useTranslation();
    const [roles, setRoles] = useState(null);
    const [id, setId] = useState(null);
    const shiftId = shift.shiftId;
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
        <div className="card">
            <Card className="max-w-sm">
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    <p><strong>{t('date')}:</strong> {formatDate(shift.date)}</p>
                    <p><strong>{t('time')}:</strong> {formatTime(shift.startTime)} - {formatTime(shift.endTime)}</p>
                    <p><strong>{t('volunteers')}:</strong> {shift.registeredUsers} / {shift.capacity}</p>
                    <p><strong>{shift.district}, {city}</strong></p>
                    <p><strong> {shift.street} {shift.homeNum}</strong></p>
                    <p>{shift.shiftDirections}</p>
                </p>
                <form onSubmit={(e) => e.preventDefault()}>
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
                    {canSignIn && userShifts.includes(shiftId) && <button type="button"  onClick={() => setConfirmLeave(true)} id="sign-out">{t('signOff')} </button>}               
                    <Confirmation id="sign-off"
                        buttonName={t('signIn')}
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
                </form>
            </Card>
            

            {!canSignIn && !isAdmin && !isModerator && <p id="sign_in_section_error">{t('volunteersRestricedFunctionality')}. <Link to="/login">{t('signInToday')}</Link></p>}
        </div>
    );
};

export default ShiftCard;
