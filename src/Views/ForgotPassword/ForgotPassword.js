import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { Card, Label, TextInput } from "flowbite-react";
import '../../styles/reset-password.scss';
import { toast } from 'react-toastify';
import putRequestNoAuth from '../../Utils/putRequestNoAuth';
import passwordValidator from '../../Utils/passwordValidation.js';
import { URLS } from '../../config';
import { VscArrowLeft } from 'react-icons/vsc';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const newPasswordInputRef = useRef(null);
    const confirmNewPasswordInputRef = useRef(null);
    const [passwordErrors, setPasswordErrors] = useState([]);

    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');

    const handlePasswordChange = (e) => {
        e.preventDefault();

        const newPassword = newPasswordInputRef.current?.value;
        const confirmPassword = confirmNewPasswordInputRef.current?.value;

        const errors = passwordValidator(newPassword);
        if (errors.length > 0) {
            setPasswordErrors(errors);
            return;
        }

        if (newPassword === confirmPassword) {
            const data = {
                email: email,
                password: newPassword
            };

            putRequestNoAuth(URLS.SET_PASSWORD, data, t('resetPasswordSuccess'), t('somethingWentWrong'));
        } else {
            toast.error(t('passwordsHaveToMatch'));
        }
    };

    return (
        <div className='reset-password'>
            <Link to="/login" id="back">
                <VscArrowLeft id="back_arrow" /> {t('back')}
            </Link>
            <div className="reset-password-container">
                <Card className='reset-password-card'>
                    <h2>{t('createNewPassword')}</h2>
                    <p className='reset-password-tip'>
                        {t('passwordResetTip')}
                    </p>
                    <form className="flex max-w-md flex-col gap-4" onSubmit={handlePasswordChange}>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="new-password" value={t('newPassword')} />
                            </div>
                            <TextInput id="new-password" ref={newPasswordInputRef} type="password" required />
                            {passwordErrors.length > 0 && (
                                <div className="error-messages">
                                    {passwordErrors.map((error, index) => (
                                        <p key={index} className="error">{error}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="new-password-confirm" value={t('confirmPassword')} />
                            </div>
                            <TextInput id="new-password-confirm" ref={confirmNewPasswordInputRef} type="password" required />
                        </div>
                        <div className='reset-password-buttons'>
                            <button type="submit" className='confirm_button' id='reset-password-btn'>{t('changePassword')}</button>
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

export default ForgotPassword;