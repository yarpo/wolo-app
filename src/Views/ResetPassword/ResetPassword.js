"use client";

import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Label, TextInput } from "flowbite-react";
import '../../styles/reset-password.scss';
import { toast } from 'react-toastify';
import putRequest from '../../Utils/putRequest';
import { URLS } from '../../config';
import { Link } from 'react-router-dom';
import {VscArrowLeft} from 'react-icons/vsc';


const ResetPassword = () => {
    const { t } = useTranslation();

    const currentPasswordInputRef = useRef(null);
    const newPasswordInputRef = useRef(null);
    const confirmNewPasswordInputRef = useRef(null);

    const handleResetPassword = (e) => {
        e.preventDefault();

        const oldPassword = currentPasswordInputRef.current?.value;
        const newPassword = newPasswordInputRef.current?.value;
        const confirmPassword = confirmNewPasswordInputRef.current?.value;

        if (newPassword === confirmPassword) {
            const data = {
                oldPassword: oldPassword,
                newPassword: newPassword
            };
            putRequest(URLS.RESET_PASSWORD, localStorage.getItem('token'), data, t('resetPasswordSuccess'), t('somethingWentWrong'))
        } else {
            toast.error(t('passwordsHaveToMatch'))
        }

    }

    return (
        <div className='reset-password'>
            <Link to="/settings" id="back">
                <VscArrowLeft id="back_arrow" /> {t('back')}
            </Link>
            <div className="reset-password-container">
                <Card className='reset-password-card'>
                    <h2>{t('resetPassword')} </h2>
                    <p className='reset-password-tip'> 
                        {t('passwordResetTip')}
                    </p>
                    <form className="flex max-w-md flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                            <Label htmlFor="current-password" value={t('oldPassword')} />
                            </div>
                            <TextInput id="current-password" ref={currentPasswordInputRef} type="password" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                            <Label htmlFor="new-password" value={t('newPassword')} />
                            </div>
                            <TextInput id="new-password" ref={newPasswordInputRef} type="password" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                            <Label htmlFor="new-password-confirm" value={t('confirmPassword')} />
                            </div>
                            <TextInput id="new-password-confirm" ref={confirmNewPasswordInputRef} type="password" required />
                        </div>
                        <div className='reset-password-buttons'>
                            <button onClick={handleResetPassword} className='confirm_button' id='reset-password-btn'>{t('changePassword')}</button>
                            <Link to="/settings" id="back">
                                <button className='white_button' id='reset-password-btn'>{t('cancelLeave')}</button>
                            </Link>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default ResetPassword;