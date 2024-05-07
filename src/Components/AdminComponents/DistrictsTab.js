import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';

import { URLS } from '../../config';
import fetchDataWithAuth  from  '../../Utils/fetchDataWithAuth.js';
import { Table } from "flowbite-react";

import AddDistrict from './addRecordModals/AddDistricts';
import Confirmation from '../Popups/Confirmation';
import postRequestWithJson from '../../Utils/postRequestWithJson';
import deleteRequest from '../../Utils/deleteRequest.js';

const DistrictsTab = () => {
    const { t } = useTranslation();
    const [districts, setDistricts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [districtToDelete, setDistrictToDelete] = useState(null);

    useEffect(() => {
        fetchDataWithAuth(URLS.DISTRICTS_ADMIN, setDistricts, localStorage.getItem('token'));
    }, []);

    const handleModalAccept = (data) => {
        setOpenModal(false);

        postRequestWithJson(URLS.ADD_DISTRICTS, localStorage.getItem('token'), data, t('addDistrctSuccess'), t('addDistrictFail'));
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
        params.append('id', districtToDelete);
        console.log("Delete confirmed", districtToDelete);
        deleteRequest(`${URLS.DELETE_DISTRICT}?id=${districtToDelete}`, localStorage.getItem('token'), "Deleted", "Fail")
        setDistrictToDelete(null);
        setConfirmDelete(false);
    };

    return (
        <div className="overflow-x-auto">
            <button className="confirm_button" onClick={() => setOpenModal(true)}> Add </button>
            {openModal && <AddDistrict onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>District Name</Table.HeadCell>
                    <Table.HeadCell>City</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {districts.map((district, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {district.id}
                            </Table.Cell>
                            <Table.Cell>{district.name}</Table.Cell>
                            <Table.Cell>{district.cityName}</Table.Cell>
                            <Table.Cell>{district.old ? "Not active" : "Active"}</Table.Cell>
                            <Table.Cell>
                                {!district.old ? <button
                                    className="delete-button"
                                    onClick={() => {
                                        setConfirmDelete(true);
                                        setDistrictToDelete(district.id);
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
                                        setDistrictToDelete(null);
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

export default DistrictsTab;