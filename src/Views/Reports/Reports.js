import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import '../../styles/reports.scss';
import ReportCard from '../../Components/ReportCard/ReportCard';
import ReportAdd from '../../Components/ReportCard/ReportAdd/ReportAddModal';
import fetchData from '../../Utils/fetchData';
import fetchDataWithAuth from '../../Utils/fetchDataWithAuth';
import postRequestWithJson from '../../Utils/postRequestWithJson';
import { URLS } from '../../config';

const ReportPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const eventId = searchParams.get('event');

    const eventName = `name${localStorage.getItem('i18nextLng').toUpperCase()}`;

    const [reports, setReports] = useState([]);
    const [event, setEvent] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetchData(`${URLS.EVENTS}/${eventId}`, setEvent);
        fetchDataWithAuth(`${URLS.REPORTS}?eventId=${eventId}`, setReports, localStorage.getItem('token'));
    }, [eventId]);

    const handleModalAccept = (data) => {
        setOpenModal(false);
        data.event = eventId;
        postRequestWithJson(`${URLS.ADD_REPORT}?language=${localStorage.getItem('i18nextLng').toLocaleUpperCase()}`, 
                            localStorage.getItem('token'),
                            data,
                            t('reportAddedSuccess'),
                            t('reportAddedFail'))
    };

    const handleModalClose = () => {
        setOpenModal(false);
    }

    return (
        <div className='report_page_container'>
            <div className='report_page_header_container'>
                <h1>{t('reports')}</h1>
                <div className='report_page_add_button'>
                    <button className="confirm_button" onClick={() => setOpenModal(true)}> {t('addReport')} </button>
                </div>
            </div>
            <h2 className='report_page_header'>{t('event')}: {event && event[eventName]}</h2>
            {openModal && <ReportAdd onAccept={handleModalAccept} onClose={handleModalClose} />}
            {reports && reports.map(report => (
                <ReportCard className='report_card'
                    key={report.id}
                    report={report}
                />
            ))}
        </div>
    );
};

export default ReportPage;
