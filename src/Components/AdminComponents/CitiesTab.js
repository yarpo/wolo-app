import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';

import { URLS } from '../../config';
import fetchData  from  '../../Utils/fetchData';
import { Table } from "flowbite-react";

import AddCity from './addRecordModals/AddCity.js';
import postRequestWithJson from '../../Utils/postRequestWithJson';

const CitiesTab = () => {
    const { t } = useTranslation();
    const [cities, setCities] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetchData(URLS.CITIES, setCities);
    }, []);

    const handleModalAccept = (data) => {
        setOpenModal(false);

        postRequestWithJson(URLS.ADD_CITIES, localStorage.getItem('token'), data, t('addCitySuccess'), t('addCityFail'));
    };

    const handleModalClose = () => {
        setOpenModal(false);
    }

    return (
        <div className="overflow-x-auto">
            <button className="confirm_button" onClick={() => setOpenModal(true)}> Add </button>
            {openModal && <AddCity onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>City Name</Table.HeadCell>
                    <Table.HeadCell>Districts</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {cities.map((city, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {city.id}
                            </Table.Cell>
                            <Table.Cell>{city.name}</Table.Cell>
                            <Table.Cell>{city.districts.join(', ')}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
};

export default CitiesTab;