import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';

import { URLS } from '../../config';
import fetchData  from  '../../Utils/fetchData';
import { Table } from "flowbite-react";

import AddDistrict from './addRecordModals/AddDistricts';
import postRequestWithJson from '../../Utils/postRequestWithJson';
import EditDistrict from './editRecordModals/EditDistrict';
import putRequest from '../../Utils/putRequest.js';


const DistrictsTab = () => {
    const { t } = useTranslation();
    const [districts, setDistricts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setEditOpenModal] = useState(false);
    const [districtToEdit, setDistrictToEdit] = useState(null);

    useEffect(() => {
        fetchData(URLS.DISTRICTS, setDistricts);
    }, []);

    const handleModalAccept = (data) => {
        setOpenModal(false);

        postRequestWithJson(URLS.ADD_DISTRICTS, localStorage.getItem('token'), data, t('addDistrctSuccess'), t('addDistrictFail'));
    };

    const handleModalClose = () => {
        setOpenModal(false);
    }
    const handleEdit = (data) => {
        putRequest(`${URLS.EDIT_DISTRICT}`, localStorage.getItem('token'), data, "District was changed successfully", "Failed to change District's data");
        setDistrictToEdit(null);
    };
    

    return (
        <div className="overflow-x-auto">
            <button className="confirm_button" onClick={() => setOpenModal(true)}> Add </button>
            {openModal && <AddDistrict onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>District Name</Table.HeadCell>
                    <Table.HeadCell>City Name</Table.HeadCell>
                    <Table.HeadCell>Edit</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {districts.map((district, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {district.id}
                            </Table.Cell>
                            <Table.Cell>{district.name}</Table.Cell>
                            <Table.Cell>{district.cityName}</Table.Cell>
                            <Table.Cell>{/* edit row */}
                                {openEditModal && districtToEdit === district && <EditDistrict onAccept={handleEdit} onClose={handleModalClose} districtData={district} />}
                                <button className="edit-button" onClick={() =>{ setEditOpenModal(true);setDistrictToEdit(district);}}> Edit </button>
                                </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
};

export default DistrictsTab;