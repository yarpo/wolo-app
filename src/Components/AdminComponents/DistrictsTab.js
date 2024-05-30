import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/admin-home-page.scss';
import { HiOutlineSearch } from "react-icons/hi";

import { URLS } from '../../config';
import fetchData  from  '../../Utils/fetchData';
import { Table, TextInput } from "flowbite-react";

import AddDistrict from './addRecordModals/AddDistricts';
import postRequestWithJson from '../../Utils/postRequestWithJson';

const DistrictsTab = () => {
    const { t } = useTranslation();
    const [districts, setDistricts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [filteredDstricts, setFilteredDistricts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData(URLS.DISTRICTS, (data) => {
            setDistricts(data);
            setFilteredDistricts(data);
        });
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

        postRequestWithJson(URLS.ADD_DISTRICTS, localStorage.getItem('token'), data, t('addDistrctSuccess'), t('addDistrictFail'));
    };

    const handleModalClose = () => {
        setOpenModal(false);
    }

    return (
        <div className="overflow-x-auto">
            <div className="admin-panel-search-bar">
                <TextInput
                    type="text"
                    placeholder="Search distrcts"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={HiOutlineSearch}
                />
            </div>
            <button className="confirm_button" onClick={() => setOpenModal(true)}> Add </button>
            {openModal && <AddDistrict onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>District Name</Table.HeadCell>
                    <Table.HeadCell>City Name</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {filteredDstricts.map((district, index) => (
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