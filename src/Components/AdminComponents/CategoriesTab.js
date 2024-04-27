import React, { useState, useEffect } from 'react';
import '../../styles/admin-home-page.scss';

import { URLS } from '../../config';
import fetchData  from  '../../Utils/fetchData';
import { Table } from "flowbite-react";

const CategoriesTab = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchData(URLS.CATEGORIES, setCategories);
    }, []);

    return (
        <div className="overflow-x-auto">
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