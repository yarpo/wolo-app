"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/reports.scss';
import { Card } from "flowbite-react";
import { URLS } from '../../config';
import postRequest from '../../Utils/postRequest.js';

const ReportCard = ({ report }) => {    
    const { t } = useTranslation();

    const reportName = `report${localStorage.getItem('i18nextLng').toUpperCase()}`;
    
    const handlePublishToggle = async (newPublishedStatus) => {
        const token = localStorage.getItem('token');
        const url = newPublishedStatus 
            ? `${URLS.PUBLISH_REPORT}/${report.id}` 
            : `${URLS.UNPUBLISH_REPORT}/${report.id}`;
        
        await postRequest(
            url,
            token,
            {},
            t('reportUpdatedSuccessfully'),
            t('reportUpdatedFailed'),
            undefined 
        );
    };

    return (
        <div className='report_card_container'>
            <Card id="report_card" horizontal>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {t('report')}
                </h5>
                <h5 className='report_card_info_text'>{report.published ? t('thisIsYourPublicReport') : ""} </h5>
                <p>
                    {report[reportName]}
                </p>
                <div>
                    {!report.published && <button className="confirm_button" onClick={() => handlePublishToggle(true)}>
                        {t('publish')}
                    </button>}
                    {report.published && <button className="confirm_button" onClick={() => handlePublishToggle(false)}>
                        {t('unpublish')}
                    </button>}
                    <button className="confirm_button">
                        {t('edit')}
                    </button>
                    <button className="white_button">
                        {t('delete')}
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default ReportCard;
