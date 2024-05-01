import React, { useState, useEffect } from 'react';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import { Table } from "flowbite-react";
import fetchData from '../../Utils/fetchData';
import postRequestWithJson from '../../Utils/postRequestWithJson.js';
import Confirmation from '../Popups/Confirmation.js';
import { URLS } from '../../config';

import '../../styles/admin-home-page.scss';
import AddOrganisation from './addRecordModals/AddOrganisation.js';

const OrganisationsTab = () => {
    const { t } = useTranslation();
    const [organisations, setOrganisations] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);

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
    };

    const toggleDetails = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleUserConfirmation = async (confirmation) => {
        setUserConfirmed(confirmation);
    };

    useEffect(() => {
        if (userConfirmed !== false) {
            setUserConfirmed(false);
        }
    }, [userConfirmed]); 

    const handleDelete = () => {
        // Implement delete logic here
        console.log("Delete confirmed");
        setConfirmDelete(false); // Close the confirmation popup after deletion
    };

    return (
        <div className="overflow-x-auto">
            <button className="confirm_button" onClick={() => setOpenModal(true)}> Add </button>
            {openModal && <AddOrganisation onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Confirmation
                title="Delete Organisation"
                message="Are you sure you want to delete this organisation?"
                onConfirm={handleDelete}
                onCancel={() => setConfirmDelete(false)}
                isOpen={confirmDelete}
            />
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Organisation Name</Table.HeadCell>
                    <Table.HeadCell>Organisation Email</Table.HeadCell>
                    <Table.HeadCell>Organisation Phone</Table.HeadCell>
                    <Table.HeadCell>Organisation Address</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell> {/* Add Actions column header */}
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
                                <Table.Cell>
                                    <button
                                        className="delete-button"
                                        onClick={() => setConfirmDelete(true)}
                                    >
                                        <span>Delete</span>
                                    </button>
                                    <Confirmation id="sign-off"
                                        buttonName="Delete"
                                        title="Czy usunąć"
                                        accept="Tak, usuń"
                                        deny="Anuluj"
                                        styleId="sign-in"
                                        onAgree={() => {
                                            handleUserConfirmation(true)
                                            console.log("Deleteeee")
                                            setConfirmDelete(false)}}
                                        onDeny={() => 
                                            setConfirmDelete(false)}
                                        openModal={confirmDelete}
                                        setOpenModal={setConfirmDelete}
                                    />
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
    );
};

export default OrganisationsTab;
