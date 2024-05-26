"use client";

import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Label, TextInput } from "flowbite-react";
import '../../styles/reset-password.scss';
import { toast } from 'react-toastify';
import putRequest from '../../Utils/putRequest';
import { URLS } from '../../config';

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
            putRequest(URLS.RESET_PASSWORD, localStorage.getItem('token'), data, t('resetPasswordSuccess'), t('resetPasswordFail'))
        } else {
            toast.error("Passwords doesn't match")
        }

    }

    return (
        <div className="reset-password-container">
            <Card>
            <h2>{t('resetPassword')} </h2>
            <form className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="current-password" value="Current password" />
                    </div>
                    <TextInput id="current-password" ref={currentPasswordInputRef} type="password" required />
                </div>
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
                    <button type="submit" className='confirm_button' onClick={handleResetPassword}>Submit</button>
                </form>
            </Card>
        </div>
    );
};

export default ResetPassword;