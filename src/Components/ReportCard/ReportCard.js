"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/reports.scss';
import { Card } from "flowbite-react";
import { URLS } from '../../config';
import putRequest from '../../Utils/putRequest.js';

const ReportCard = ({ report }) => {    
    const { t } = useTranslation();

    const reportName = `report${localStorage.getItem('i18nextLng').toUpperCase()}`;
    const token = localStorage.getItem('token');

    const handlePublishToggle = async (newPublishedStatus) => {
        const url = `${URLS.EDIT_REPORT}?language=${localStorage.getItem('i18nextLng').toLocaleUpperCase()}`;
        const payload = {
            id: report.id,
            published: newPublishedStatus,
            event: report.event,
        };

        await putRequest(
            url,
            token,
            payload,
            t('Report updated successfully'),
            t('Error updating report'),
            undefined 
        );
    };

    return (
        <div className='report_card_container'>
            <Card id="report_card" horizontal>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {t('report')}
                </h5>
                <p>
                    {report[reportName]} 
                    {report.published ? "yes" : "no"} 
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
