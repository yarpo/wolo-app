import React, { useState, useEffect } from 'react';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';
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
    const [openIndex, setOpenIndex] = useState(null);

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

    const toggleDetails = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="overflow-x-auto">
            <button className="confirm_button" onClick={() => setOpenModal(true)}> Add </button>
            {openModal && <AddOrganisation onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Organisation Name</Table.HeadCell>
                    <Table.HeadCell>Organisation Email</Table.HeadCell>
                    <Table.HeadCell>Organisation Phone</Table.HeadCell>
                    <Table.HeadCell>Organisation Address</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {organisations.map((organisation, index) => (
                        <React.Fragment key={index}>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {index + 1}
                                </Table.Cell>
                                <Table.Cell>{organisation.name}</Table.Cell>
                                <Table.Cell>{organisation.email}</Table.Cell>
                                <Table.Cell>{organisation.phoneNumber}</Table.Cell>
                                <Table.Cell>{organisation.street} {organisation.homeNum}</Table.Cell>
                                <Table.Cell>
                                    <button
                                        className="details-toggle"
                                        onClick={() => toggleDetails(index)}
                                    >
                                        {openIndex === index ? <VscChevronUp /> : <VscChevronDown />}
                                        <span className="dropdown-label">Details</span>
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                            {openIndex === index && (
                                <Table.Row>
                                    <Table.Cell colSpan="7">
                                        <div className="dropdown-content">
                                            <p><strong>Organisation Logo URL:</strong> {organisation.logoUrl}</p>
                                            <p><strong>Organisation Description:</strong> {organisation.description}</p>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </React.Fragment>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
};

export default OrganisationsTab;