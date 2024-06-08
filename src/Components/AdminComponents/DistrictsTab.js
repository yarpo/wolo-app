import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';
import { HiOutlineSearch } from "react-icons/hi";
import { URLS } from '../../config';
import fetchDataWithAuth from '../../Utils/fetchDataWithAuth.js';
import { Table, TextInput } from "flowbite-react";
import { HiOutlinePlus, HiTrash, HiCheck, HiOutlineX, HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";
import Confirmation from '../Popups/Confirmation.js';
import ReactPaginate from 'react-paginate';

import AddDistrict from './addRecordModals/AddDistricts';
import postRequestWithJson from '../../Utils/postRequestWithJson';
import deleteRequest from '../../Utils/deleteRequest.js';

const DistrictsTab = () => {
    const { t } = useTranslation();
    const [districts, setDistricts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [districtToDelete, setDistrictToDelete] = useState(null);
    const [districtNameToDelete, setDistrictNameToDelete] = useState('');
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const districtsPerPage = 10;

    useEffect(() => {
        fetchDataWithAuth(URLS.DISTRICTS_ADMIN, (data) => {
            setDistricts(data);
            setFilteredDistricts(data);
        }, localStorage.getItem('token'));
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredDistricts(districts);
        } else {
            setFilteredDistricts(districts.filter(district =>
                district.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                district.cityName.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }, [searchQuery, districts]);

    const handleModalAccept = (data) => {
        setOpenModal(false);
        postRequestWithJson(URLS.ADD_DISTRICTS, localStorage.getItem('token'), data, t('addDistrictSuccess'), t('addDistrictFail'));
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const handleDelete = useCallback(() => {
        console.log("Delete confirmed", districtToDelete);
        deleteRequest(`${URLS.DELETE_DISTRICT}/${districtToDelete}`, localStorage.getItem('token'), t('districtDeleteSuccess'), t('somethingWentWrong'));
        setDistrictToDelete(null);
        setConfirmDelete(false);
    }, [districtToDelete, t]);

    const handleUserConfirmation = async (confirmation) => {
        setUserConfirmed(confirmation);
    };

    useEffect(() => {
        if (userConfirmed !== false) {
            setUserConfirmed(false);
            handleDelete();
        }
    }, [userConfirmed, handleDelete]);

    const handleDeleteRequest = (district) => {
        setConfirmDelete(true);
        setDistrictToDelete(district.id);
        setDistrictNameToDelete(district.name);
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const offset = currentPage * districtsPerPage;
    const currentDistricts = filteredDstricts.sort((a, b) => a.id - b.id).slice(offset, offset + districtsPerPage);
    const pageCount = Math.ceil(filteredDstricts.length / districtsPerPage);


    return (
        <div className="overflow-x-auto">
            <div className='admin-panel-add-search-group'>
                <div className="admin-panel-search-bar">
                    <TextInput
                        type="text"
                        placeholder={t('searchDistricts')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={HiOutlineSearch}
                    />
                </div>
                <button className="admin-panel-add" onClick={() => setOpenModal(true)}><HiOutlinePlus /></button>
            </div>
            {openModal && <AddDistrict onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>{t('id')}</Table.HeadCell>
                    <Table.HeadCell>{t('name')}</Table.HeadCell>
                    <Table.HeadCell>{t('city')}</Table.HeadCell>
                    <Table.HeadCell>{t('active')}</Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {filteredDistricts
                        .sort((a, b) => a.id - b.id)
                        .map((district, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {district.id}
                            </Table.Cell>
                            <Table.Cell>{district.name}</Table.Cell>
                            <Table.Cell>{district.cityName}</Table.Cell>
                            <Table.Cell>{!district.old ? <HiCheck /> : <HiOutlineX />}</Table.Cell>
                            <Table.Cell className="table-cell-action">
                                {!district.old ? <button
                                    className="delete-button"
                                    onClick={() => handleDeleteRequest(district)} 
                                >
                                    <span><HiTrash /></span>
                                </button> : " "}
                                <Confirmation
                                    id="sign-off"
                                    buttonName="Delete"
                                    title={t('doYouWantToDelete') + ": " + districtNameToDelete + "?"} 
                                    accept={t('delete')}
                                    deny={t('discard')}
                                    styleId="sign-in"
                                    onAgree={() => {
                                        handleUserConfirmation(true);
                                        setConfirmDelete(false);
                                    }}
                                    onDeny={() => {
                                        setConfirmDelete(false);
                                        setDistrictNameToDelete(null);
                                    }}
                                    openModal={confirmDelete}
                                    setOpenModal={setConfirmDelete}
                                />
                            </Table.Cell>
                        </Table.Row>
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

export default DistrictsTab;
