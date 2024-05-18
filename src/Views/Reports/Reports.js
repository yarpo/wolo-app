import React from 'react';
import { useTranslation } from 'react-i18next';

import '../../styles/reports.scss';

import ReportCard from '../../Components/ReportCard/ReportCard';

const ReportPage = () => {    
    const { t } = useTranslation();

    return (
        <div className='report_page_container'>
            <h1 className='report_page_header'>{t('reports')}</h1>
            <ReportCard className='report_card'

            />
            <ReportCard className='report_card'
                
                />
        </div>
    )
};

export default ReportPage;