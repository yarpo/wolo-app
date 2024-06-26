import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { URLS } from '../../../config.js';
import { Link } from 'react-router-dom';
import fetchUser from '../../../Utils/fetchUser.js'; 
import postRequest from '../../../Utils/postRequest.js';
import Confirmation from '../../../Components/Popups/Confirmation.js';
import { Card } from "flowbite-react";
import { HiOutlineExclamation } from "react-icons/hi";
import formatTime from '../../../Utils/formatTime.js';
import fetchDataWithAuth from '../../../Utils/fetchDataWithAuth.js';

const ShiftCard = ({ shift, city, isInPast }) => {
    const { t } = useTranslation();
    const shiftDirections = `shiftDirections${localStorage.getItem('i18nextLng').toUpperCase()}`;
    const [roles, setRoles] = useState(null);
    const shiftId = shift.shiftId;
    const canSignIn = roles && roles.includes('USER');
    const token = localStorage.getItem('token');
    const [userShifts, setUserShifts] = useState(JSON.parse(localStorage.getItem('userShifts')) || []);
    const [userShiftsReserve, setUserShiftsReserve] = useState(JSON.parse(localStorage.getItem('userShiftsReserve')) || []);
    const isModerator = roles && roles.includes('MODERATOR');
    const isAdmin = roles && roles.includes('ADMIN');
    const isFull = shift.registeredUsers >= shift.capacity;
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [confirmPhone, setConfirmPhone] = useState(false);
    const [confirmLeave, setConfirmLeave] = useState(false);
    const [overlappingShift, setOverlappingShift] = useState(false);

    const isSignedIn = userShifts.length > 0 ? userShifts.map(shift => shift.shiftId).includes(shiftId) : false;
    const isSignedInReserve = userShiftsReserve.length > 0 ? userShiftsReserve.map(shift => shift.shiftId).includes(shiftId) : false;

    useEffect(() => {
        fetchUser().then(data => {
            if (data) {
                setRoles(data.roles);

                if (data.id) { 
                    fetchDataWithAuth(`${URLS.USER_EVENTS_CURRENT}`, (shifts) => {
                        setUserShifts(shifts);
                        localStorage.setItem('userShifts', JSON.stringify(shifts));
                    }, localStorage.getItem('token'));

                    fetchDataWithAuth(`${URLS.USER_EVENTS_RESERVE}`, (shifts) => {
                        setUserShiftsReserve(shifts);
                        localStorage.setItem('userShiftsReserve', JSON.stringify(shifts));
                    }, localStorage.getItem('token'));
                }
            }
        });
    }, []);

    useEffect(() => {
        if (userShifts.length > 0) {
            const overlapping = userShifts.some(userShift => {
                if (userShift.shiftId === shiftId) {
                    return false; // Ignore the current shift
                }
                const userShiftDate = new Date(userShift.date);
                const shiftDate = new Date(shift.date);
                return userShiftDate.toDateString() === shiftDate.toDateString() && (
                    (userShift.startTime < shift.endTime && userShift.startTime >= shift.startTime) ||
                    (userShift.endTime > shift.startTime && userShift.endTime <= shift.endTime)
                );
            });
            setOverlappingShift(overlapping);
        }
    }, [userShifts, shift, shiftId]);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'userShifts' || event.key === 'userShiftsReserve') {
                setUserShifts(JSON.parse(localStorage.getItem('userShifts')) || []);
                setUserShiftsReserve(JSON.parse(localStorage.getItem('userShiftsReserve')) || []);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleUserConfirmation = async (confirmation) => {
        setUserConfirmed(confirmation);
    };

    const handleEventInteract = useCallback(async () => {
        if (userConfirmed) {
            const params = new URLSearchParams();
            params.append('shift', shift.shiftId);

            try {
                if (!isSignedIn && !isSignedInReserve) {
                    if (!overlappingShift) {
                        params.append('reserve', isFull);
                        await postRequest(URLS.JOIN, token, params, t('joinShiftSuccess'), t('joinShiftError'));

                        const updatedUserShifts = [...userShifts, shift];
                        setUserShifts(updatedUserShifts);
                        localStorage.setItem('userShifts', JSON.stringify(updatedUserShifts));
                    } else {
                        toast.error(t('shiftOverlapWarning'));
                    }
                } else {
                    await postRequest(URLS.REFUSE, token, params, t('leaveShiftSuccess'), t('leaveShiftError'));

                    const updatedUserShifts = userShifts.filter(userShift => userShift.shiftId !== shift.shiftId);
                    setUserShifts(updatedUserShifts);
                    localStorage.setItem('userShifts', JSON.stringify(updatedUserShifts));
                }
            } catch (error) {
                toast.error(t('unknownError'));
            }
        }
    }, [token, shift, userConfirmed, t, isFull, isSignedIn, overlappingShift, userShifts, isSignedInReserve]);

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
                <p><strong>{shift.street} {shift.homeNum}</strong></p>
                <p>{shift[shiftDirections]}</p>
                {shift.requiredMinAge && shift.requiredMinAge > 0 && (
                    <p className='card-extra-requirements'>
                        <HiOutlineExclamation className='card-extra-requirements'/> {t('ageRestrictions')}: {shift.requiredMinAge}
                    </p>
                )}
            </span>
            <div className='shift_card_buttons'>
                {!isInPast && (
                    <form onSubmit={(e) => e.preventDefault()}>
                        {overlappingShift && !isSignedIn && (
                            <p className='card-extra-requirements'>
                                <HiOutlineExclamation className='card-extra-requirements'/> {t('shiftOverlapWarning')}
                            </p>
                        )}
                        {canSignIn && !isFull && !isSignedIn && !overlappingShift && (
                            <button type="button" onClick={() => setConfirmPhone(true)} id="sign-in">{t('joinShift')}</button>
                        )}
                        <Confirmation id="sign-in"
                            buttonName={t('joinShift')}
                            title={t('phoneConfirmation')}
                            accept={t('agreeConfirmation')}
                            deny={t('declineConfirmation')}
                            styleId="sign-in"
                            onAgree={() => {
                                handleUserConfirmation(true);
                                handleEventInteract();
                                setConfirmPhone(false);
                            }}
                            onDeny={() => setConfirmPhone(false)}
                            openModal={confirmPhone}
                            setOpenModal={setConfirmPhone}
                        />
                        {canSignIn && isSignedIn && (
                            <button type="button" onClick={() => setConfirmLeave(true)} id="sign-out">{t('leaveShift')}</button>
                        )}
                        <Confirmation id="sign-out"
                            buttonName={t('leaveShift')}
                            title={t('leaveShiftConfirmation')}
                            accept={t('agreeToLeave')}
                            deny={t('cancelLeave')}
                            styleId="sign-out"
                            onAgree={() => {
                                handleUserConfirmation(true);
                                handleEventInteract();
                                setConfirmLeave(false);
                            }}
                            onDeny={() => setConfirmLeave(false)}
                            openModal={confirmLeave}
                            setOpenModal={setConfirmLeave}
                        />
                        {canSignIn && !isAdmin && !isSignedIn && isFull && (
                            <p className='card-extra-requirements'>
                                <HiOutlineExclamation className='card-extra-requirements'/> {t('fullShift')}
                                {!isSignedInReserve && (
                                    <button type="button" onClick={() => setConfirmPhone(true)} id="sign-in">{t('joinReserveList')}</button>
                                )}
                                {isSignedInReserve && (
                                    <button type="button" onClick={() => setConfirmLeave(true)} id="sign-out">{t('leaveReserveList')}</button>
                                )}
                            </p>
                        )}
                        {!canSignIn && !isAdmin && !isModerator && (
                            <p id="sign_in_section_error">
                                {t('volunteersRestricedFunctionality')}. <Link to="/login">{t('logInToday')}</Link>
                            </p>
                        )}
                    </form>
                )}
            </div>
        </Card>
    );
};

export default ShiftCard;