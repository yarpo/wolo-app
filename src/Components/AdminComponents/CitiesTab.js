import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';
import { HiOutlineSearch } from "react-icons/hi";

import { URLS } from '../../config';
import fetchData  from  '../../Utils/fetchData';
import { Table, TextInput } from "flowbite-react";
import { HiOutlinePlus  } from "react-icons/hi";

import AddCity from './addRecordModals/AddCity.js';
import postRequestWithJson from '../../Utils/postRequestWithJson';

const CitiesTab = () => {
    const { t } = useTranslation();
    const [cities, setCities] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [filteredCities, setFilteredCities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData(URLS.CITIES, (data) => {
            setCities(data);
            setFilteredCities(data);
        });
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredCities(cities);
        } else {
            setFilteredCities(cities.filter(city =>
                city.name.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }, [searchQuery, cities]);

    const handleModalAccept = (data) => {
        setOpenModal(false);

        postRequestWithJson(URLS.ADD_CITIES, localStorage.getItem('token'), data, t('addCitySuccess'), t('addCityFail'));
    };

    const handleModalClose = () => {
        setOpenModal(false);
    }

    return (
        <div className="overflow-x-auto">
            <div className='admin-panel-add-search-group'>
                <div className="admin-panel-search-bar">
                    <TextInput
                        type="text"
                        placeholder="Search users"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={HiOutlineSearch}
                    />
                </div>
                <button className="admin-panel-add" onClick={() => setOpenModal(true)}><HiOutlinePlus /></button>
            </div>
            {openModal && <AddCity onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>City Name</Table.HeadCell>
                    <Table.HeadCell>Districts</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {filteredCities.map((city, index) => (
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