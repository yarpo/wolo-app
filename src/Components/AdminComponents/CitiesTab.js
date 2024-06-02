import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';
import { HiOutlineSearch } from "react-icons/hi";

import { URLS } from '../../config';
import fetchDataWithAuth  from  '../../Utils/fetchDataWithAuth.js';
import { Table, TextInput } from "flowbite-react";
import { HiOutlinePlus, HiTrash, HiCheck, HiOutlineX } from "react-icons/hi";
import Confirmation from '../Popups/Confirmation.js';

import AddCity from './addRecordModals/AddCity.js';
import postRequestWithJson from '../../Utils/postRequestWithJson';
import deleteRequest from '../../Utils/deleteRequest.js';

const CitiesTab = () => {
    const { t } = useTranslation();
    const [cities, setCities] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [cityToDelete, setCityToDelete] = useState(null);
    const [cityNameToDelete, setCityNameToDelete] = useState('');

    const [filteredCities, setFilteredCities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchDataWithAuth(URLS.CITIES_ADMIN, (data) => {
            setCities(data);
            setFilteredCities(data);
        }, localStorage.getItem('token'));
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

        postRequestWithJson(URLS.CITIES_ADMIN, localStorage.getItem('token'), data, t('addCitySuccess'), t('addCityFail'));
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
        console.log("Delete confirmed", cityToDelete);
        deleteRequest(`${URLS.DELETE_CITY}/${cityToDelete}`, localStorage.getItem('token'), t('cityDeleteSuccess'), t('somethingWentWrong'))
        setCityToDelete(null);
        setConfirmDelete(false);
    };

    const handleDeleteRequest = (city) => {
        setConfirmDelete(true);
        setCityToDelete(city.id);
        setCityNameToDelete(city.name);
    };

    return (
        <div className="overflow-x-auto">
            <div className='admin-panel-add-search-group'>
                <div className="admin-panel-search-bar">
                    <TextInput
                        type="text"
                        placeholder={t('searchCities')}
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
                    <Table.HeadCell>{t('id')}</Table.HeadCell>
                    <Table.HeadCell>{t('name')}</Table.HeadCell>
                    <Table.HeadCell>{t('districts')}</Table.HeadCell>
                    <Table.HeadCell>{t('active')}</Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {filteredCities.map((city, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {city.id}
                            </Table.Cell>
                            <Table.Cell>{city.name}</Table.Cell>
                            <Table.Cell>{city.districts.join(', ')}</Table.Cell>
                            <Table.Cell>{!city.old ? <HiCheck /> : <HiOutlineX />}</Table.Cell>
                            <Table.Cell className="table-cell-action">
                                {!city.old ? <button
                                    className="delete-button"
                                    onClick={() => handleDeleteRequest(city)} 
                                >
                                    <span><HiTrash /></span>
                                </button> : " "}
                                <Confirmation
                                    id="sign-off"
                                    buttonName="Delete"
                                    title={t('doYouWantToDelete') + ": " + cityNameToDelete + "?"} 
                                    accept={t('delete')}
                                    deny={t('discard')}
                                    styleId="sign-in"
                                    onAgree={() => {
                                        handleUserConfirmation(true);
                                        setConfirmDelete(false);
                                    }}
                                    onDeny={() => {
                                        setConfirmDelete(false);
                                        setCityNameToDelete(null);
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