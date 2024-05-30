import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';

import { URLS } from '../../config';
import fetchData  from  '../../Utils/fetchData';
import { Table } from "flowbite-react";

import AddDistrict from './addRecordModals/AddDistricts';
import postRequestWithJson from '../../Utils/postRequestWithJson';

const DistrictsTab = () => {
    const { t } = useTranslation();
    const [districts, setDistricts] = useState([]);
    const [openModal, setOpenModal] = useState(false);

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

    return (
        <div className="overflow-x-auto">
            <button className="confirm_button" onClick={() => setOpenModal(true)}> Add </button>
            {openModal && <AddDistrict onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Table hoverable>
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
    )
};

export default DistrictsTab;