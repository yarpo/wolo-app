"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from "flowbite-react";
import '../../styles/registration.scss';
import { Link } from 'react-router-dom';
import { HiMail } from "react-icons/hi";


const CheckEmail = () => {
    const { t } = useTranslation();

    return (
        <div className='registration'>
            <div className="registration-container">
                <Card className='registration-card'>
                    <HiMail className='registration-svg' />
                    <h2>{t('registrationInProgress')}</h2>
                    <p className='registration-tip'>{t('checkYourEmail')}</p>
                    <div className='registration-buttons'>
                        <Link to="/login" id="back">
                        <button className='confirm_button'>{t('confirm')}</button>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default CheckEmail;