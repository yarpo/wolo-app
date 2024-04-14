import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';

import { URLS } from '../../config';
import  fetchData  from  '../../Utils/fetchData'

import { Tabs } from "flowbite-react";
import { Table } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const AdminHomePage = () => {
    const [districts, setDistricts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
          fetchData(URLS.DISTRICTS, setDistricts);
    }, []);

    useEffect(() => {
          fetchData(URLS.CATEGORIES, setCategories);
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
                <div className="overflow-x-auto">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell>Category ID</Table.HeadCell>
                            <Table.HeadCell>Category Name</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {categories.map((category, index) => (
                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {category.id}
                                    </Table.Cell>
                                    <Table.Cell>{category.name}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </Tabs.Item>
            <Tabs.Item title={t('districts')} icon={HiClipboardList}>
                <div className="overflow-x-auto">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell>District ID</Table.HeadCell>
                            <Table.HeadCell>District Name</Table.HeadCell>
                            <Table.HeadCell>City Name</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {districts.map((district, index) => (
                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {district.id}
                                    </Table.Cell>
                                    <Table.Cell>{district.name}</Table.Cell>
                                    <Table.Cell>{district.cityId}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </Tabs.Item>
        </Tabs>
    </div>
    )
};

export default AdminHomePage;