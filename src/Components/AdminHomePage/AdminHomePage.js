import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';

import { URLS } from '../../config';
import fetchData  from  '../../Utils/fetchData';
import fetchDataWithAuth from '../../Utils/fetchDataWithAuth.js';

import { Tabs } from "flowbite-react";
import { Table } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const AdminHomePage = () => {
    const [users, setUsers] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [organisations, setOrganisations] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchDataWithAuth(URLS.USERS, setUsers, token)
        fetchData(URLS.ORGANISATIONS, setOrganisations);
        fetchData(URLS.CATEGORIES, setCategories);
        fetchData(URLS.DISTRICTS, setDistricts);
    }, []);
    
    const { t } = useTranslation();

    return (
    <div className='admin_home_page_container'>
        <h1 className='admin_home_page_text'>{t('administratorPanel')}</h1>
        <Tabs aria-label="Default tabs" style="default">
            <Tabs.Item active title={t('users')} icon={HiUserCircle}>
                <div className="overflow-x-auto">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell>ID</Table.HeadCell>
                            <Table.HeadCell>User Name</Table.HeadCell>
                            <Table.HeadCell>User Email</Table.HeadCell>
                            <Table.HeadCell>User Phone</Table.HeadCell>
                            <Table.HeadCell>User roles</Table.HeadCell>
                            <Table.HeadCell>Organisation Moderator</Table.HeadCell>
                            <Table.HeadCell>Adult</Table.HeadCell>
                            <Table.HeadCell>Pesel Verified</Table.HeadCell>
                            <Table.HeadCell>Agreement Signed</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {users.map((user, index) => (
                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {user.id}
                                    </Table.Cell>
                                    <Table.Cell>{user.firstName} {user.lastName}</Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>{user.phoneNumber}</Table.Cell>
                                    <Table.Cell>{user.roles.join(', ')}</Table.Cell>
                                    <Table.Cell>{user.organisationName ? user.organisationName : '-'}</Table.Cell>
                                    <Table.Cell>{user.adult ? 'YES' : 'NO'}</Table.Cell>
                                    <Table.Cell>{user.peselVerified ? 'YES' : 'NO'}</Table.Cell>
                                    <Table.Cell>{user.agreementSigned ? 'YES' : 'NO'}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </Tabs.Item>
            <Tabs.Item title={t('organisations')} icon={MdDashboard}>
                <div className="overflow-x-auto">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell>ID</Table.HeadCell>
                            <Table.HeadCell>Organisation Name</Table.HeadCell>
                            <Table.HeadCell>Organisation Description</Table.HeadCell>
                            <Table.HeadCell>Organisation Email</Table.HeadCell>
                            <Table.HeadCell>Organisation Phone</Table.HeadCell>
                            <Table.HeadCell>Organisation Address</Table.HeadCell>
                            <Table.HeadCell>Organisation Logo URL</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {organisations.map((organisation, index) => (
                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {index + 1}
                                    </Table.Cell>
                                    <Table.Cell>{organisation.name}</Table.Cell>
                                    <Table.Cell>{organisation.description}</Table.Cell>
                                    <Table.Cell>{organisation.email}</Table.Cell>
                                    <Table.Cell>{organisation.phoneNumber}</Table.Cell>
                                    <Table.Cell>{organisation.street} {organisation.homeNum}</Table.Cell>
                                    <Table.Cell>{organisation.logoUrl}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </Tabs.Item>
            <Tabs.Item title={t('events')} icon={HiAdjustments}>

            </Tabs.Item>
            <Tabs.Item title={t('categories')} icon={HiClipboardList}> 
                <div className="overflow-x-auto">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell>ID</Table.HeadCell>
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
                            <Table.HeadCell>ID</Table.HeadCell>
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
                                    <Table.Cell>{district.cityName}</Table.Cell>
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