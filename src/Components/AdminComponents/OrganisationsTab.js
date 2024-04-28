import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from "flowbite-react";

import fetchData  from  '../../Utils/fetchData';
import postRequestWithJson from '../../Utils/postRequestWithJson.js';

import '../../styles/admin-home-page.scss';
import AddOrganisation from './addRecordModals/AddOrganisation.js';
import { URLS } from '../../config';

const OrganisationsTab = () => {
    const { t } = useTranslation();
    const [organisations, setOrganisations] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetchData(URLS.ORGANISATIONS, setOrganisations);
    }, []);

    const handleModalAccept = (data) => {
        setOpenModal(false);
        console.log("Accepted Data:", data);

        postRequestWithJson(URLS.ADD_ORGANISATION, localStorage.getItem('token'), data, t('addOrganisationSuccess'), t('addOrganisationFail'));
    };

    const handleModalClose = () => {
        setOpenModal(false);
    }

    return (
        <div className="overflow-x-auto">
            <button className="confirm_button" onClick={() => setOpenModal(true)}> Add </button>
            {openModal && <AddOrganisation onAccept={handleModalAccept} onClose={handleModalClose} />}
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
    )
};

export default OrganisationsTab;