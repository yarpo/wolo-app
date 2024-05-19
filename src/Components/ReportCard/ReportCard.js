"use client";

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/reports.scss';
import { Card } from "flowbite-react";
import { URLS } from '../../config';
import Confirmation from '../Popups/Confirmation.js';
import postRequestWithJson from '../../Utils/postRequestWithJson.js';
import deleteRequest from '../../Utils/deleteRequest.js';

const ReportCard = ({ report }) => {    
    const { t } = useTranslation();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);
    const reportName = `report${localStorage.getItem('i18nextLng').toUpperCase()}`;
    const token = localStorage.getItem('token');
    
    const handlePublishToggle = async (newPublishedStatus) => {
        const url = newPublishedStatus 
            ? `${URLS.PUBLISH_REPORT}/${report.id}` 
            : `${URLS.UNPUBLISH_REPORT}/${report.id}`;
        
        await postRequestWithJson(
            url,
            token,
            {}, 
            t('reportUpdatedSuccessfully'),
            t('reportUpdatedFailed')
        );
    };

    const handleUserConfirmation = async (confirmation) => {
        setUserConfirmed(confirmation);

    };

    useEffect(() => {
        if (userConfirmed !== false) {
            setUserConfirmed(false);
            deleteRequest(`${URLS.DELETE_REPORT}/${report.id}`, token, t('reportDeleteSuccess'), t('reportDeleteFail'))
            setConfirmDelete(false);
        }
    }, [userConfirmed, report.id, token, t]); 

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
                    <button className="white_button" onClick={() => {setConfirmDelete(true)}}>
                        {t('delete')}
                    </button>
                    <Confirmation
                        buttonName={t('delete')}
                        title={t('deleteReport')}
                        accept={t('delete')}
                        deny={t('discard')}
                        styleId="sign-in"
                        onAgree={() => {
                            handleUserConfirmation(true);
                            setConfirmDelete(false);
                        }}
                        onDeny={() => {
                            setConfirmDelete(false);
                        }}
                        openModal={confirmDelete}
                        setOpenModal={setConfirmDelete}
                    />
                </div>
            </Card>
        </div>
    );
};

export default ReportCard;
