import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';

import { URLS } from '../../config';
import  fetchDataWithAuth  from  '../../Utils/fetchDataWithAuth'

import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const AdminHomePage = () => {
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        fetchDataWithAuth(URLS.DISTRICTS, setDistricts, localStorage.getItem('token'));
    }, []);
    
    const { t } = useTranslation();

    return (
    <div className='admin_home_page_container'>
        <Tabs aria-label="Default tabs" style="default">
            <Tabs.Item active title={t('users')} icon={HiUserCircle}>

            </Tabs.Item>
            <Tabs.Item title={t('organisations')} icon={MdDashboard}>

            </Tabs.Item>
            <Tabs.Item title={t('events')} icon={HiAdjustments}>

            </Tabs.Item>
            <Tabs.Item title={t('categories')} icon={HiClipboardList}>


            </Tabs.Item>
                <Tabs.Item title={t('districts')} icon={HiClipboardList}>
                    <pre>{JSON.stringify(districts, null, 2)}</pre>
                </Tabs.Item>
        </Tabs>
    </div>
    )
};

export default AdminHomePage;