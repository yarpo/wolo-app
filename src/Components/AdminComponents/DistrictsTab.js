import React, { useState, useEffect } from 'react';
import '../../styles/admin-home-page.scss';

import { URLS } from '../../config';
import fetchData  from  '../../Utils/fetchData';
import { Table } from "flowbite-react";

const DistrictsTab = () => {
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        fetchData(URLS.DISTRICTS, setDistricts);
    }, []);

    return (
        <div className="overflow-x-auto">
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>District Name</Table.HeadCell>
                    <Table.HeadCell>City Name</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {districts.map((district, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {district.id}
                            </Table.Cell>
                            <Table.Cell>{district.name}</Table.Cell>
                            <Table.Cell>{district.cityName}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
};

export default DistrictsTab;