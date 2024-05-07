import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';

import { URLS } from '../../config';
import fetchDataWithAuth  from  '../../Utils/fetchDataWithAuth.js';
import deleteRequest from '../../Utils/deleteRequest.js';
import { Table } from "flowbite-react";

import AddCity from './addRecordModals/AddCity.js';
import Confirmation from '../Popups/Confirmation';
import postRequestWithJson from '../../Utils/postRequestWithJson';

const CitiesTab = () => {
    const { t } = useTranslation();
    const [cities, setCities] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [cityToDelete, setCityToDelete] = useState(null);

    useEffect(() => {
        fetchDataWithAuth(URLS.CITIES, setCities, localStorage.getItem('token'));
    }, []);

    const handleModalAccept = (data) => {
        setOpenModal(false);

        postRequestWithJson(URLS.ADD_CITIES, localStorage.getItem('token'), data, t('addCitySuccess'), t('addCityFail'));
    };

    const handleModalClose = () => {
        setOpenModal(false);
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
        params.append('id', cityToDelete);
        console.log("Delete confirmed", cityToDelete);
        deleteRequest(`${URLS.DELETE_CITY}?id=${cityToDelete}`, localStorage.getItem('token'), "Deleted", "Fail")
        setCityToDelete(null);
        setConfirmDelete(false);
    };

    return (
        <div className="overflow-x-auto">
            <button className="confirm_button" onClick={() => setOpenModal(true)}> Add </button>
            {openModal && <AddCity onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>City Name</Table.HeadCell>
                    <Table.HeadCell>Districts</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {cities.map((city, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {city.id}
                            </Table.Cell>
                            <Table.Cell>{city.name}</Table.Cell>
                            <Table.Cell>{city.districts.join(', ')}</Table.Cell>
                            <Table.Cell>{city.old ? "Not active" : "Active"}</Table.Cell>
                            <Table.Cell>
                                {!city.old ? <button
                                    className="delete-button"
                                    onClick={() => {
                                        setConfirmDelete(true);
                                        setCityToDelete(city.id);
                                    }}
                                >
                                    <span>Delete</span>
                                </button> : ""}
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
                                        setCityToDelete(null);
                                    }}
                                    openModal={confirmDelete}
                                    setOpenModal={setConfirmDelete}
                                />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
};

export default CitiesTab;