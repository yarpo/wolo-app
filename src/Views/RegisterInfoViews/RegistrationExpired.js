"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from "flowbite-react";
import '../../styles/reset-password.scss';
import { Link } from 'react-router-dom';


const RegistartionExpired = () => {
    const { t } = useTranslation();

    return (
        <div className='reset-password'>
            <div className="reset-password-container">
                <Card className='reset-password-card'>
                    <h2>{t('registrationExpired')} </h2>
                    <p className='reset-password-tip'> 
                        {t('thisLinkHasExpired')}
                    </p>
                    <div className='reset-password-buttons'>
                        <Link to="/login" id="back">
                            <button className='confirm_button'>{t('login')}</button>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default RegistartionExpired;