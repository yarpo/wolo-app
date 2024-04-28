import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';

import { URLS } from '../../config';
import fetchData  from  '../../Utils/fetchData';
import { Table } from "flowbite-react";

import AddCategory from './addRecordModals/AddCategory';
import postRequestWithJson from '../../Utils/postRequestWithJson';

const CategoriesTab = () => {
    const { t } = useTranslation();
    const [categories, setCategories] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetchData(URLS.CATEGORIES, setCategories);
    }, []);

    const handleModalAccept = (data) => {
        setOpenModal(false);

        postRequestWithJson(URLS.ADD_CATEGORIES, localStorage.getItem('token'), data, t('addCategorySuccess'), t('addCategoryFail'));
    };

    const handleModalClose = () => {
        setOpenModal(false);
    }

    return (
        <div className="overflow-x-auto">
            <button className="confirm_button" onClick={() => setOpenModal(true)}> Add </button>
            {openModal && <AddCategory onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Category Name</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {categories.map((category, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {category.id}
                            </Table.Cell>
                            <Table.Cell>{category.name}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
};

export default CategoriesTab;