import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';

import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

import UsersTab from '../../Components/AdminComponents/UsersTab.js';
import OrganisationsTab from '../../Components/AdminComponents/OrganisationsTab.js';
import EventsTab from '../../Components/AdminComponents/EventsTab.js';
import CategoriesTab from '../../Components/AdminComponents/CategoriesTab.js';
import DistrictsTab from '../../Components/AdminComponents/DistrictsTab.js';
import CitiesTab from '../../Components/AdminComponents/CitiesTab.js';
import FAQTab from '../../Components/AdminComponents/FAQTab.js';

const AdminHomePage = () => {    
    const { t } = useTranslation();

    return (
        <div className='admin_home_page_container'>
            <h1 className='admin_home_page_text'>{t('administratorPanel')}</h1>
            <Tabs aria-label="Default tabs" style="default">
                <Tabs.Item active title={t('users')} icon={HiUserCircle}>
                    <UsersTab />
                </Tabs.Item>
                <Tabs.Item title={t('organisations')} icon={MdDashboard}>
                    <OrganisationsTab />
                </Tabs.Item>
                <Tabs.Item title={t('events')} icon={HiAdjustments}>
                    <EventsTab />
                </Tabs.Item>
                <Tabs.Item title={t('categories')} icon={HiClipboardList}> 
                    <CategoriesTab />
                </Tabs.Item>
                <Tabs.Item title={t('cities')} icon={HiClipboardList}>
                    <CitiesTab />
                </Tabs.Item>
                <Tabs.Item title={t('districts')} icon={HiClipboardList}>
                    <DistrictsTab />
                </Tabs.Item>
                <Tabs.Item title={t('help')} icon={HiClipboardList}>
                    <FAQTab />
                </Tabs.Item>
            </Tabs>
        </div>
    )
};

export default AdminHomePage;