"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from "flowbite-react";
import '../../styles/registration.scss';
import { HiCheck } from "react-icons/hi";
import { useLocation, useNavigate } from 'react-router-dom';
import { URLS } from '../../config';


const CompleteRegistration = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    const otp = searchParams.get('otp');

    const handleRegisterComplete = async () => {
        const params = new URLSearchParams({
            email: email, 
            otp: otp
          });
    
        try {
            const response = await fetch(`${URLS.REGISTER_CONFIRM}?${params.toString()}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
    
            if (response.ok) {
                const responseBody = await response.text();
                if (responseBody.toUpperCase === 'OK') {
                    navigate(URLS.REGISTER_SUCCES);
                } else {
                    navigate(`${URLS.REGISTER_FAIL}?email=${email}`);
                }
            }
        } catch (error) {
                console.error('Error:', error);
                navigate('/*');
        }
    }

    return (
        <div className='registration'>
            <div className="registration-container">
                <Card className='registration-card'>
                    <HiCheck className='registration-svg' />
                    <h2>{t('registrationInProgress')} </h2>
                    <p className='registration-tip'> 
                        {t('confirmRegistration')}
                    </p>
                    <div className='registration-buttons'>
                        <button className='confirm_button' onClick={handleRegisterComplete}>{t('completeRegistartion')}</button>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default CompleteRegistration;