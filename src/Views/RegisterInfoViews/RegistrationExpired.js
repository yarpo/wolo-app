"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from "flowbite-react";
import '../../styles/registration.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiX } from "react-icons/hi";
import { toast } from 'react-toastify';
import { URLS } from '../../config';
import 'react-toastify/dist/ReactToastify.css';


const RegistartionExpired = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');

    const resendMail = async () => {
        const params = new URLSearchParams({
            email: email, 
        });
    
        try {
            const response = await fetch(`${URLS.RESEND_MAIL}?${params.toString()}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
    
            if (response.ok) {
                const responseBody = await response.text();
                if (responseBody.toUpperCase === 'OK') {
                    navigate(URLS.REGISTRATION_IN_PROGRESS);
                } else {
                    toast.error(t('somethingWentWrong'));
                }
            }
        } catch (error) {
            toast.error(t('somethingWentWrong'));
        }
    }

    return (
        <div className='registration'>
            <div className="registration-container">
                <Card className='registration-card'>
                    <HiX className='registration-svg' />
                    <h2>{t('registrationExpired')} </h2>
                    <p className='registration-tip'> 
                        {t('thisLinkHasExpired')}
                    </p>
                    <div className='registration-buttons'>
                        <button className='confirm_button' onClick={resendMail}>{t('resendMail')}</button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default RegistartionExpired;