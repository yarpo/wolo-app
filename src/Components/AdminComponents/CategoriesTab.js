import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';
import { HiOutlineSearch } from "react-icons/hi";
import { URLS } from '../../config';
import { HiTrash, HiOutlinePlus, HiArrowSmRight, HiArrowSmLeft } from "react-icons/hi";
import { Table, TextInput } from "flowbite-react";
import AddCategory from './addRecordModals/AddCategory';
import Confirmation from '../Popups/Confirmation';
import ReactPaginate from 'react-paginate';
import fetchData from '../../Utils/fetchData.js';
import putRequest from "../../Utils/putRequest.js";
import EditCategory from "./editRecordModals/EditCategory.js";
import postRequestWithJson from '../../Utils/postRequestWithJson';
import deleteRequest from '../../Utils/deleteRequest.js';

const CategoriesTab = () => {
  
    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);
  	const [openEditModal, setEditOpenModal] = useState(false);
	  const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [categoryNameToDelete, setCategoryNameToDelete] = useState('');

    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const categoriesPerPage = 10;

    useEffect(() => {
        fetchData(URLS.CATEGORIES, (data) => {
            setCategories(data);
            setFilteredCategories(data);
        });
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredCategories(categories);
        } else {
            setFilteredCategories(categories.filter(category =>
                category.name.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }, [searchQuery, categories]);

    const handleModalAccept = (data) => {
        setOpenModal(false);
        postRequestWithJson(URLS.ADD_CATEGORIES, localStorage.getItem('token'), data, t('addCategorySuccess'), t('addCategoryFail'));
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setEditOpenModal(false);
    };

    const handleDelete = useCallback(() => {
        const params = new URLSearchParams();
        params.append('id', categoryToDelete);
        deleteRequest(`${URLS.DELETE_CATEGORY}/${categoryToDelete}`, localStorage.getItem('token'), "Deleted", "Fail");
        setCategoryToDelete(null);
        setConfirmDelete(false);
    }, [categoryToDelete]);

    const handleUserConfirmation = async (confirmation) => {
        setUserConfirmed(confirmation);
    };

    useEffect(() => {
        if (userConfirmed !== false) {
            setUserConfirmed(false);
            handleDelete();
        }
    }, [userConfirmed, handleDelete]); 

    const handleDeleteRequest = (category) => {
        setConfirmDelete(true);
        setCategoryToDelete(category.id);
        setCategoryNameToDelete(category.name);
    };
  	const handleEdit = (data) => {
      putRequest(
        `${URLS.EDIT_CATEGORY}`,
        localStorage.getItem("token"),
        data,
        "Category was changed successfully",
        "Failed to change the category"
      );
      setCategoryToEdit(null);
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const offset = currentPage * categoriesPerPage;
    const currentCategories = filteredCategories.sort((a, b) => a.id - b.id).slice(offset, offset + categoriesPerPage);
    const pageCount = Math.ceil(filteredCategories.length / categoriesPerPage);

    return (
        <div className="overflow-x-auto">
            <div className='admin-panel-add-search-group'>
                <div className="admin-panel-search-bar">
                    <TextInput
                        type="text"
                        placeholder={t('searchCategories')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={HiOutlineSearch}
                    />
                </div>
                <button className="admin-panel-add" onClick={() => setOpenModal(true)}><HiOutlinePlus /></button>
            </div>
            {openModal && <AddCategory onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>{t('id')}</Table.HeadCell>
                    <Table.HeadCell>{t('name')}</Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {currentCategories
                        .map((category, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {category.id}
                            </Table.Cell>
                            <Table.Cell>{category.name}</Table.Cell>
                            <Table.Cell>
                              {/* edit row */}
                              {openEditModal && categoryToEdit === category && (
                                <EditCategory
                                  onAccept={handleEdit}
                                  onClose={handleModalClose}
                                  categoryData={category}
                                />
                              )}
                              <button
                                className="edit-button"
                                onClick={() => {
                                  setEditOpenModal(true);
                                  setCategoryToEdit(category);
                                }}
                              >
                                {" "}
                                Edit{" "}
                              </button>
                            </Table.Cell>
                            <Table.Cell className="table-cell-action">
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteRequest(category)}
                                >
                                    <span><HiTrash /></span>
                                </button>
                                <Confirmation
                                    id="sign-off"
                                    buttonName={t('delete')}
                                    title={t('doYouWantToDelete') + ": " + categoryNameToDelete + "?"} 
                                        accept={t('delete')}
                                        deny={t('discard')}
                                    styleId="sign-in"
                                    onAgree={() => {
                                        handleUserConfirmation(true);
                                        setConfirmDelete(false);
                                    }}
                                    onDeny={() => {
                                        setConfirmDelete(false);
                                        setCategoryToDelete(null);
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

export default CategoriesTab;
