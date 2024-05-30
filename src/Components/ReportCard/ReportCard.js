import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/reports.scss';
import { Card, Textarea, Label } from "flowbite-react";
import { URLS } from '../../config';
import Confirmation from '../Popups/Confirmation.js';
import postRequestWithJson from '../../Utils/postRequestWithJson.js';
import deleteRequest from '../../Utils/deleteRequest.js';
import putRequest from '../../Utils/putRequest.js';

const ReportCard = ({ report }) => {    
    const { t } = useTranslation();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        reportPL: report.reportPL || '',
        reportEN: report.reportEN || '',
        reportUA: report.reportUA || '',
        reportRU: report.reportRU || ''
    });

    const token = localStorage.getItem('token');
    const reportName = `report${localStorage.getItem('i18nextLng').toUpperCase()}`;
    
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

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAccept = async () => {
        formData.id = report.id;
        formData.published = report.published;
        formData.event = report.event;
        const url = `${URLS.EDIT_REPORT}`;

        await putRequest(
            url,
            token,
            formData,
            t('reportEditedSuccess'),
            t('reportEditedFail'),
            undefined
        );

        setIsEditMode(false);
    };

    const handleDiscard = () => {
        setFormData({
            reportPL: report.reportPL || '',
            reportEN: report.reportEN || '',
            reportUA: report.reportUA || '',
            reportRU: report.reportRU || ''
        });
        setIsEditMode(false);
    };

    return (
        <div className='report_card_container'>
            <Card id="report_card" horizontal>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {t('report')}
                </h5>
                <h5 className='report_card_info_text'>{report.published ? t('thisIsYourPublicReport') : ""} </h5>
                
                {!isEditMode ? (
                    <p>
                        {report[reportName]}
                    </p>
                ) : (
                    <div>
                        <Label htmlFor="reportPL" value={t('reportPL')} />
                        <Textarea
                            className="report_card_textarea"
                            name="reportPL"
                            value={formData.reportPL}
                            onChange={handleEditChange}
                            placeholder={t('reportPL')}
                        />
                        <br />
                        <Label htmlFor="reportEN" value={t('reportEN')} />
                        <Textarea
                            className="report_card_textarea"
                            name="reportEN"
                            value={formData.reportEN}
                            onChange={handleEditChange}
                            placeholder={t('reportEN')}
                        />
                        <br />
                        <Label htmlFor="reportUA" value={t('reportUA')} />
                        <Textarea
                            className="report_card_textarea"
                            name="reportUA"
                            value={formData.reportUA}
                            onChange={handleEditChange}
                            placeholder={t('reportUA')}
                        />
                        <br />
                        <Label htmlFor="reportRU" value={t('reportRU')} />
                        <Textarea
                            className="report_card_textarea"
                            name="reportRU"
                            value={formData.reportRU}
                            onChange={handleEditChange}
                            placeholder={t('reportRU')}
                        />
                        <br />
                        <button className="confirm_button" onClick={handleAccept}>
                            {t('accept')}
                        </button>
                        <button className="white_button" onClick={handleDiscard}>
                            {t('discard')}
                        </button>
                    </div>
                )}

                <div>
                    {!report.published && <button className="confirm_button" onClick={() => handlePublishToggle(true)}>
                        {t('publish')}
                    </button>}
                    {report.published && <button className="confirm_button" onClick={() => handlePublishToggle(false)}>
                        {t('unpublish')}
                    </button>}
                    {!isEditMode && (
                        <button className="confirm_button" onClick={() => setIsEditMode(true)}>
                            {t('edit')}
                        </button>
                    )}
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
