"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from "flowbite-react";
import '../../styles/registration.scss';
import { Link } from 'react-router-dom';
import { HiCheck } from "react-icons/hi";


const RegistartionSuccess = () => {
    const { t } = useTranslation();

    return (
        <div className='registration'>
            <div className="registration-container">
                <Card className='registration-card'>
                    <HiCheck className='registration-svg' />
                    <h2>{t('registrationCompleted')} </h2>
                    <p className='registration-tip'> 
                        {t('youCanNowLogIn')}
                    </p>
                    <div className='registration-buttons'>
                        <Link to="/login" id="back">
                            <button className='confirm_button'>{t('login')}</button>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default RegistartionSuccess;