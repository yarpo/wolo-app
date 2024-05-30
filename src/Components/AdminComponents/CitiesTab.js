import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';
import { HiOutlineSearch } from "react-icons/hi";

import { URLS } from '../../config';
import fetchData  from  '../../Utils/fetchData';
import { Table, TextInput } from "flowbite-react";

import AddCity from './addRecordModals/AddCity.js';
import postRequestWithJson from '../../Utils/postRequestWithJson';
import EditCity from './editRecordModals/EditCity.js';
import putRequest from '../../Utils/putRequest.js';

const CitiesTab = () => {
    const { t } = useTranslation();
    const [cities, setCities] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setEditOpenModal] = useState(false);
    const [cityToEdit, setCityToEdit] = useState(null);

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
        setEditOpenModal(false);
    };
    const handleEdit = (data) => {
        putRequest(`${URLS.EDIT_CITY}`, localStorage.getItem('token'), data, "City was changed successfully", "Failed to change city's details: One of selected districts belongs to an already existing event.\n You cannot remove it.")
        setCityToEdit(null);
    };


    return (
        <div className="overflow-x-auto">
            <div className="admin-panel-search-bar">
                <TextInput
                    type="text"
                    placeholder="Search cities"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={HiOutlineSearch}
                />
            </div>
            <button className="confirm_button" onClick={() => setOpenModal(true)}> Add </button>
            {openModal && <AddCity onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>City Name</Table.HeadCell>
                    <Table.HeadCell>Districts</Table.HeadCell>
                    <Table.HeadCell>Edit</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {filteredCities.map((city, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {city.id}
                            </Table.Cell>
                            <Table.Cell>{city.name}</Table.Cell>
                            <Table.Cell>{city.districts.join(', ')}</Table.Cell>
                            <Table.Cell>{/* edit row */}
                                {openEditModal && cityToEdit === city && <EditCity onAccept={handleEdit} onClose={handleModalClose} cityData={city} />}
                                <button className="edit-button" onClick={() =>{setEditOpenModal(true);setCityToEdit(city);}}> Edit </button>
                                </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
};

export default CitiesTab;