import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import '../../styles/reports.scss';
import ReportCard from '../../Components/ReportCard/ReportCard';
import fetchData from '../../Utils/fetchData';
import fetchDataWithAuth from '../../Utils/fetchDataWithAuth';
import { URLS } from '../../config';

const ReportPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const eventId = searchParams.get('event');

    const eventName = `name${localStorage.getItem('i18nextLng').toUpperCase()}`;

    const [reports, setReports] = useState([]);
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetchData(`${URLS.EVENTS}/${eventId}`, setEvent);
        fetchDataWithAuth(`${URLS.REPORTS}/id=${eventId}`, (data) => {
            if (Array.isArray(data)) {
                setReports(data);
            } else {
                console.log('Expected an array of reports, but got:', data);
            }
        }, localStorage.getItem('token'));
    }, [eventId]);

    console.log(reports);

    return (
        <div className='report_page_container'>
            <h1 className='report_page_header'>{t('reports')}</h1>
            <h2 className='report_page_header'>{t('event')}: {event && event[eventName]}</h2>
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
