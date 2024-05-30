import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';
import { HiOutlineSearch } from "react-icons/hi";

import { URLS } from '../../config';
import { HiTrash } from "react-icons/hi";
import { Table, TextInput } from "flowbite-react";

import AddCategory from './addRecordModals/AddCategory';
import Confirmation from '../Popups/Confirmation';

import fetchData  from  '../../Utils/fetchData.js';
import postRequestWithJson from '../../Utils/postRequestWithJson';
import deleteRequest from '../../Utils/deleteRequest.js';

const CategoriesTab = () => {
    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const [filteredCategories, setFilteredCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

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
        params.append('id', categoryToDelete);
        console.log("Delete confirmed", categoryToDelete);
        deleteRequest(`${URLS.DELETE_CATEGORY}/${categoryToDelete}`, localStorage.getItem('token'), "Deleted", "Fail")
        setCategoryToDelete(null);
        setConfirmDelete(false);
    };

    return (
        <div className="overflow-x-auto">
            <div className="admin-panel-search-bar">
                <TextInput
                    type="text"
                    placeholder="Search categories"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={HiOutlineSearch}
                />
            </div>
            <button className="confirm_button" onClick={() => setOpenModal(true)}> Add </button>
            {openModal && <AddCategory onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Category Name</Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {filteredCategories.map((category, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {category.id}
                            </Table.Cell>
                            <Table.Cell>{category.name}</Table.Cell>
                            <Table.Cell>
                                <button
                                    className="delete-button"
                                    onClick={() => {
                                        setConfirmDelete(true);
                                        setCategoryToDelete(category.id);
                                    }}
                                >
                                    <span><HiTrash /></span>
                                </button>
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
        </div>
    )
};

export default CategoriesTab;