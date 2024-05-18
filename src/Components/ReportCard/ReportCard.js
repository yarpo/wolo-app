"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';

import '../../styles/reports.scss';

import { Card } from "flowbite-react";

const ReportCard = () => {    
    const { t } = useTranslation();

    return (
        <div className='report_card_container'>
            <Card id="report_card" horizontal>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {t('report')}
                </h5>
                <p>
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order. 
                </p>
                <div>
                    <button  className="confirm_button">
                        {t('publish')}
                    </button>
                    <div id="report_card_right_button">
                        <button  className="confirm_button">
                            {t('edit')}
                        </button>
                        <button  className="white_button">
                            {t('delete')}
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    )
};

export default ReportCard;