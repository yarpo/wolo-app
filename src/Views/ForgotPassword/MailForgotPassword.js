"use client";

import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Label, TextInput } from "flowbite-react";
import '../../styles/reset-password.scss';
import { toast } from 'react-toastify';
import putRequestNoAuth from '../../Utils/putRequestNoAuth';
import { URLS } from '../../config';
import {VscArrowLeft} from 'react-icons/vsc';
import { Link } from 'react-router-dom';

const MailForgotPassword = () => {
    const { t } = useTranslation();

    const emailInputRef = useRef(null);

    const handlePasswordChange = (e) => {
        e.preventDefault();

        const email = emailInputRef.current?.value;

        if (email) {
            const data = {
                mail: email,
            };

            console.log(data)
            putRequestNoAuth(URLS.FORGOT_PASSWORD, data, t('mailResetPasswordSuccess'), t('somethingWentWrong'))
        } else {
            toast.error("Invalid email");
        }
    }

    return (
        <div className='reset-password'>
            <Link to="/login" id="back">
                <VscArrowLeft id="back_arrow" /> {t('back')}
            </Link>
            <div className="reset-password-container">
                <Card className='reset-password-card'>
                    <h2>{t('resetPassword')}</h2>
                    <p className='reset-password-tip'> 
                        {t('forgotPasswordTip')}
                    </p>
                    <form className="flex max-w-md flex-col gap-4" onSubmit={handlePasswordChange}>
                        <div>
                            <div className="mb-4 block">
                                <Label htmlFor="email" value="Email" />
                            </div>
                            <TextInput id="email" ref={emailInputRef} type="text" placeholder='woloapp@example.com' required />
                        </div>
                        <div className='reset-password-buttons'>
                            <button type="submit" className='confirm_button' id='reset-password-btn'>{t('sendEmail')}</button>
                            <Link to="/login" id="back">
                                <button className='white_button' id='reset-password-btn'>{t('cancelLeave')}</button>
                            </Link>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default MailForgotPassword;
