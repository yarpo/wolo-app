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
import AddCity from './addRecordModals/AddCity.js';
import postRequestWithJson from '../../Utils/postRequestWithJson';
import EditCity from "./editRecordModals/EditCity.js";
import putRequest from "../../Utils/putRequest.js";
import deleteRequest from '../../Utils/deleteRequest.js';

const CitiesTab = () => {
  
    const { t } = useTranslation();
    const [cities, setCities] = useState([]);
    const [openModal, setOpenModal] = useState(false);
  	const [openEditModal, setEditOpenModal] = useState(false);
  	const [cityToEdit, setCityToEdit] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [cityToDelete, setCityToDelete] = useState(null);
    const [cityNameToDelete, setCityNameToDelete] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const citiesPerPage = 10;

    useEffect(() => {
        fetchDataWithAuth(URLS.CITIES_ADMIN, (data) => {
            setCities(data);
            setFilteredCities(data);
        }, localStorage.getItem('token'));
    }, []);


    useEffect(() => {
      if (searchQuery === "") {
        setFilteredCities(cities);
      } else {
        setFilteredCities(
          cities.filter((city) =>
            city.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }
    }, [searchQuery, cities]);

    const handleModalAccept = (data) => {
        setOpenModal(false);
        postRequestWithJson(URLS.CITIES_ADMIN, localStorage.getItem('token'), data, t('addCitySuccess'), t('addCityFail'));
    };

    const handleModalClose = () => {
        setOpenModal(false);
      	setEditOpenModal(false);
    };

    const handleDelete = useCallback(() => {
        console.log("Delete confirmed", cityToDelete);
        deleteRequest(`${URLS.DELETE_CITY}/${cityToDelete}`, localStorage.getItem('token'), t('cityDeleteSuccess'), t('somethingWentWrong'));
        setCityToDelete(null);
        setConfirmDelete(false);
    }, [cityToDelete, t]);

    const handleUserConfirmation = async (confirmation) => {
        setUserConfirmed(confirmation);
    };

    useEffect(() => {
        if (userConfirmed !== false) {
            setUserConfirmed(false);
            handleDelete();
        }
    }, [userConfirmed, handleDelete]);

    const handleEdit = (data) => {
      putRequest(
        `${URLS.EDIT_CITY}`,
        localStorage.getItem("token"),
        data,
        "City was changed successfully",
        "Failed to change city's details: One of selected districts belongs to an already existing event.\n You cannot remove it."
      );
      setCityToEdit(null);
    };

    const handleDeleteRequest = (city) => {
        setConfirmDelete(true);
        setCityToDelete(city.id);
        setCityNameToDelete(city.name);
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const offset = currentPage * citiesPerPage;
    const currentCities = filteredCities.sort((a, b) => a.id - b.id).slice(offset, offset + citiesPerPage);
    const pageCount = Math.ceil(filteredCities.length / citiesPerPage);


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
                    <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {currentCities
                        .map((city, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {city.id}
                            </Table.Cell>
                            <Table.Cell>{city.name}</Table.Cell>
                            <Table.Cell>{city.districts.join(', ')}</Table.Cell>
                            <Table.Cell>{!city.old ? <HiCheck /> : <HiOutlineX />}</Table.Cell>
                            <Table.Cell>
                              {/* edit row */}
                              {openEditModal && cityToEdit === city && (
                                <EditCity
                                  onAccept={handleEdit}
                                  onClose={handleModalClose}
                                  cityData={city}
                                />
                              )}
                              <button
                                className="edit-button"
                                onClick={() => {
                                  setEditOpenModal(true);
                                  setCityToEdit(city);
                                }}
                              >
                                {" "}
                                Edit{" "}
                              </button>
                            </Table.Cell>
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
    );
};

export default CitiesTab;
