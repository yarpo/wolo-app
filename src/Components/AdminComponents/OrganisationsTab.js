import React, { useState, useEffect } from 'react';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';
import { HiOutlineSearch } from "react-icons/hi";
import { useTranslation } from 'react-i18next';
import { Table, TextInput } from "flowbite-react";
import fetchDataWithAuth from '../../Utils/fetchDataWithAuth.js';
import postRequestWithJson from '../../Utils/postRequestWithJson.js';
import Confirmation from '../Popups/Confirmation.js';
import { URLS } from '../../config';

import '../../styles/admin-home-page.scss';
import AddOrganisation from './addRecordModals/AddOrganisation.js';
import postRequest from '../../Utils/postRequest.js';
import putRequest from '../../Utils/putRequest.js';
import EditOrganisation from './editRecordModals/EditOrganisation.js';

const OrganisationsTab = () => {
    const { t } = useTranslation();
    const organisationDescription = `description${localStorage.getItem('i18nextLng').toUpperCase()}`;
    const [organisations, setOrganisations] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [organisationToDelete, setOrganisationToDelete] = useState(null);
    const [openEditModal, setEditOpenModal] = useState(false);
    const [organisationToEdit, setOrganisationToEdit] = useState(null);

    const [filteredOrganisations, setFilteredOrganisations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchDataWithAuth(URLS.ORGANISATIONS_ADMIN, (data) => {
            setOrganisations(data);
            setFilteredOrganisations(data);
        }, localStorage.getItem('token'));
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredOrganisations(organisations);
        } else {
            setFilteredOrganisations(organisations.filter(organisation =>
                organisation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                organisation.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                organisation.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }, [searchQuery, organisations]);

    const handleModalAccept = (data) => {
        setOpenModal(false);
        console.log(data)
        postRequestWithJson(`${URLS.ADD_ORGANISATION}?language=${localStorage.getItem('i18nextLng').toLocaleUpperCase()}`, localStorage.getItem('token'), data, t('addOrganisationSuccess'), t('addOrganisationFail'));
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setEditOpenModal(false);
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
            handleDelete()
        }
    }, [userConfirmed]); 

    const handleDelete = () => {
        const params = new URLSearchParams();
        params.append('id', organisationToDelete);
        console.log("Delete confirmed", organisationToDelete);
        postRequest(`${URLS.DELETE_ORGANISATION}`, localStorage.getItem('token'), params, "Deleted", "Fail")
        setOrganisationToDelete(null);
        setConfirmDelete(false);
    };
    const handleEdit = (data) => {
        putRequest(`${URLS.ORGANISATIONS}/admin/${organisationToEdit.id}/edit`, localStorage.getItem('token'), data, "Organisation was changed successfully", "Failed to change Organisation's data")
        setOrganisationToEdit(null);
    };
    

    return (
        <div className="overflow-x-auto">
            <div className="admin-panel-search-bar">
                <TextInput
                    type="text"
                    placeholder="Search organisations"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={HiOutlineSearch}
                />
            </div>
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
                    <Table.HeadCell>Organisation Status</Table.HeadCell>
                    <Table.HeadCell>More</Table.HeadCell>
                    <Table.HeadCell>Edit</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {filteredOrganisations.map((organisation, index) => (
                        <React.Fragment key={index}>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {index + 1}
                                </Table.Cell>
                                <Table.Cell>{organisation.name}</Table.Cell>
                                <Table.Cell>{organisation.email}</Table.Cell>
                                <Table.Cell>{organisation.phoneNumber}</Table.Cell>
                                <Table.Cell>{organisation.street} {organisation.homeNum}</Table.Cell>
                                <Table.Cell>{organisation.approved ? "Yes" : "No"}</Table.Cell>
                                <Table.Cell>
                                    <button
                                        className="details-toggle"
                                        onClick={() => toggleDetails(index)}
                                    >
                                        {openIndex === index ? <VscChevronUp /> : <VscChevronDown />}
                                        <span className="dropdown-label">Details</span>
                                    </button>
                                </Table.Cell>
                                <Table.Cell>{/* edit row */}
                                {openEditModal && organisationToEdit === organisation && <EditOrganisation onAccept={handleEdit} onClose={handleModalClose} organisationData={organisation} />}
                                <button className="edit-button" onClick={() =>{ setEditOpenModal(true);setOrganisationToEdit(organisation);}}> Edit </button>
                                </Table.Cell>
                                <Table.Cell>
                                    <button
                                        className="delete-button"
                                        onClick={() => {
                                            setConfirmDelete(true);
                                            setOrganisationToDelete(organisation.id);
                                        }}
                                    >
                                        <span>Delete</span>
                                    </button>
                                    <Confirmation
                                        id="sign-off"
                                        buttonName="Delete"
                                        title="Czy usunąć"
                                        accept="Tak, usuń"
                                        deny="Anuluj"
                                        styleId="sign-in"
                                        onAgree={() => {
                                            handleUserConfirmation(true);
                                            setConfirmDelete(false);
                                        }}
                                        onDeny={() => {
                                            setConfirmDelete(false);
                                            setOrganisationToDelete(null);
                                        }}
                                        openModal={confirmDelete}
                                        setOpenModal={setConfirmDelete}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            {openIndex === index && (
                                <Table.Row>
                                    <Table.Cell colSpan="8">
                                        <div className="dropdown-content">
                                            <p><strong>Organisation Logo URL:</strong> {organisation.logoUrl}</p>
                                            <p><strong>Organisation Description:</strong> {organisation[organisationDescription]}</p>
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
