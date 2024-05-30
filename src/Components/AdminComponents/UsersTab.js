import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';
import { HiOutlineSearch } from "react-icons/hi";
import '../../styles/admin-home-page.scss';
import { URLS } from '../../config';
import { HiTrash } from "react-icons/hi";
import { Table, TextInput } from "flowbite-react";

import AddUser from './addRecordModals/AddUser.js';
import Confirmation from '../Popups/Confirmation.js';

import postRequestWithJson from '../../Utils/postRequestWithJson.js';
import fetchDataWithAuth from '../../Utils/fetchDataWithAuth.js';
import deleteRequest from '../../Utils/deleteRequest.js';

const UsersTab = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const token = localStorage.getItem('token');
    const [openIndex, setOpenIndex] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchDataWithAuth(URLS.USERS, (data) => {
            setUsers(data);
            setFilteredUsers(data)
        }, token)
    }, [token]);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredUsers(users);
        } else {
            setFilteredUsers(users.filter(user =>
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }, [searchQuery, users]);

    const handleModalAccept = (data) => {
        setOpenModal(false);
        console.log(data)
        postRequestWithJson(URLS.REGISTER, localStorage.getItem('token'), data, t('addUserSuccess'), t('addUserFail'));
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
            handleDelete()
        }
    }, [userConfirmed]); 

    const handleDelete = () => {
        deleteRequest(`${URLS.DELETE_USER}/${userToDelete}`, localStorage.getItem('token'), "Deleted", "Fail")
        setUserToDelete(null);
        setConfirmDelete(false);
    };
    

    return (
        <div className="overflow-x-auto">
            <div className="admin-panel-search-bar">
                <TextInput
                    type="text"
                    placeholder="Search users"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={HiOutlineSearch}
                />
            </div>
            <button className="confirm_button" onClick={() => setOpenModal(true)}> Add </button>
            {openModal && <AddUser onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>User Name</Table.HeadCell>
                    <Table.HeadCell>User Email</Table.HeadCell>
                    <Table.HeadCell>User Phone</Table.HeadCell>
                    <Table.HeadCell>User roles</Table.HeadCell>
                    <Table.HeadCell>Organisation Moderator</Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {filteredUsers.map((user, index) => (
                        <React.Fragment key={index}>
                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {user.id}
                                </Table.Cell>
                                <Table.Cell>{user.firstName} {user.lastName}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.phoneNumber}</Table.Cell>
                                <Table.Cell>{user.roles.join(', ')}</Table.Cell>
                                <Table.Cell>{user.organisationName ? user.organisationName : '-'}</Table.Cell>
                                <Table.Cell>
                                    <button
                                        className="details-toggle"
                                        onClick={() => toggleDetails(index)}
                                    >
                                        {openIndex === index ? <VscChevronUp /> : <VscChevronDown />}
                                        <span className="dropdown-label"></span>
                                    </button>
                                </Table.Cell>
                                <Table.Cell>
                                    <button
                                        className="delete-button"
                                        onClick={() => {
                                            setConfirmDelete(true);
                                            setUserToDelete(user.id);
                                        }}
                                    >
                                        <span><HiTrash /></span>
                                    </button>
                                    <Confirmation
                                        id="sign-off"
                                        buttonName={t('delete')}
                                        title={t('delete') + "?"}
                                        accept={t('delete')}
                                        deny={t('discard')}
                                        styleId="sign-in"
                                        onAgree={() => {
                                            handleUserConfirmation(true);
                                            setConfirmDelete(false);
                                        }}
                                        onDeny={() => {
                                            setConfirmDelete(false);
                                            setUserToDelete(null);
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
                                        <p><strong>Is adult: </strong>{user.adult ? 'YES' : 'NO'}</p>
                                        <p><strong>Agreement Signed: </strong>{user.agreementSigned ? 'YES' : 'NO'}</p>
                                        <p><strong>PESEL Verified: </strong>{user.peselVerified ? 'YES' : 'NO'}</p>
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

export default UsersTab;