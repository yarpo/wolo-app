"use client";

import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Card, Label, TextInput } from "flowbite-react";
import '../../styles/reset-password.scss';
import { toast } from 'react-toastify';
//import putRequest from '../../Utils/putRequest';
//import { URLS } from '../../config';

const ForgotPassword = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const newPasswordInputRef = useRef(null);
    const confirmNewPasswordInputRef = useRef(null);

    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');

    const handlePasswordChange = (e) => {
        e.preventDefault();

        const newPassword = newPasswordInputRef.current?.value;
        const confirmPassword = confirmNewPasswordInputRef.current?.value;

        if (newPassword === confirmPassword) {
            const data = {
                email: email,
                password: newPassword
            };

            console.log(data)
            //putRequest(URLS.RESET_PASSWORD, localStorage.getItem('token'), data, t('resetPasswordSuccess'), t('resetPasswordFail'))
        } else {
            toast.error("Passwords don't match");
        }
    }

    return (
        <div className="reset-password-container">
            <Card>
                <h2>{t('resetPassword')}</h2>
                <form className="flex max-w-md flex-col gap-4" onSubmit={handlePasswordChange}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="new-password" value="New password" />
                        </div>
                        <TextInput id="new-password" ref={newPasswordInputRef} type="password" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="new-password-confirm" value="Confirm new password" />
                        </div>
                        <TextInput id="new-password-confirm" ref={confirmNewPasswordInputRef} type="password" required />
                    </div>
                    <button type="submit" className='confirm_button'>{t('submit')}</button>
                </form>
            </Card>
        </div>
    );
};

export default ForgotPassword;
