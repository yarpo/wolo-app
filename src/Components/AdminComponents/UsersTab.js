import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';
import { HiOutlineSearch, HiTrash, HiOutlinePlus, HiCheck, HiOutlineX, HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import '../../styles/admin-home-page.scss';
import { URLS } from '../../config';
import { Table, TextInput, Card } from "flowbite-react";

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
    const [userFullNameToDelete, setUserFullNameToDelete] = useState('');

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 10;

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

    const handleDeleteRequest = (user) => {
        setConfirmDelete(true);
        setUserToDelete(user.id);
        setUserFullNameToDelete(`${user.firstName} ${user.lastName}`);
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const offset = currentPage * usersPerPage;
    const currentUsers = filteredUsers.sort((a, b) => a.id - b.id).slice(offset, offset + usersPerPage);
    const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

    return (
        <div className="overflow-x-auto">
            <div className='admin-panel-add-search-group'>
                <div className="admin-panel-search-bar">
                    <TextInput
                        type="text"
                        placeholder={t('searchUsers')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={HiOutlineSearch}
                    />
                </div>
                <button className="admin-panel-add" onClick={() => setOpenModal(true)}><HiOutlinePlus /></button>
            </div>
            {openModal && <AddUser onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>{t('id')}</Table.HeadCell>
                    <Table.HeadCell>{t('name')}</Table.HeadCell>
                    <Table.HeadCell>{t('email')}</Table.HeadCell>
                    <Table.HeadCell>{t('phoneNumber')}</Table.HeadCell>
                    <Table.HeadCell>{t('roles')}</Table.HeadCell>
                    <Table.HeadCell>{t('moderator')}</Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {currentUsers
                        .map((user, index) => (
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
                                <Table.Cell className="table-cell-action">
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteRequest(user)} 
                                    >
                                        <span><HiTrash /></span>
                                    </button>
                                    <Confirmation
                                        id="sign-off"
                                        buttonName={t('doYouWantToDelete')}
                                        title={t('doYouWantToDelete') + ": " + userFullNameToDelete + "?"} 
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
                                <Table.Cell colSpan="8">
                                    <div className="dropdown-content">
                                        <Card>
                                            <div className="card-content">
                                                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                                                    {user.firstName} {user.lastName}
                                                </h5>
                                                <div className="grid-container-2">
                                                    <div className="grid-item">
                                                        <p><strong>{t('email')}: </strong>{user.email}</p>
                                                    </div>
                                                    <div className="grid-item">
                                                        <p><strong>{t('phoneNumber')}: </strong>{user.phoneNumber}</p>
                                                    </div>
                                                </div>
                                                <div className="grid-container-2">
                                                    <div className="grid-item">
                                                        <p><strong>{t('moderator')}: </strong>{user.organisationName ? user.organisationName : t('none')}</p>
                                                    </div>
                                                    <div className="grid-item">
                                                        <p><strong>{t('roles')}: </strong>{user.roles.join(', ')}</p>
                                                    </div>
                                                </div>
                                                <div className="grid-container-3">
                                                    <div className="grid-item">
                                                        <p><strong>{t('isAdult')}: </strong>{user.adult ? <HiCheck /> : <HiOutlineX />}</p>
                                                    </div>
                                                    <div className="grid-item">
                                                        <p><strong>{t('agreementSigned')}: </strong>{user.agreementSigned ? <HiCheck /> : <HiOutlineX />}</p>
                                                    </div>
                                                    <div className="grid-item">
                                                        <p><strong>{t('peselVerified')}: </strong>{user.peselVerified ? <HiCheck /> : <HiOutlineX />}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </Table.Cell>
                            )}
                        </React.Fragment>
                    ))}
                </Table.Body>
            </Table>
            <ReactPaginate
                previousLabel={<HiArrowSmLeft />}
                nextLabel={<HiArrowSmRight />}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                pageClassName={'pagination__page'}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination__link'}
                nextLinkClassName={'pagination__link'}
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination__link--active'}
            />
        </div>
    )
};

export default UsersTab;
