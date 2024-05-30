import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';
import { HiOutlineSearch } from "react-icons/hi";
import { TextInput } from "flowbite-react";
import '../../styles/admin-home-page.scss';
import { format } from 'date-fns';

import { URLS } from '../../config';
import fetchData from '../../Utils/fetchData';
import { HiTrash } from "react-icons/hi";

import { Table } from "flowbite-react";
import Confirmation from '../Popups/Confirmation';
import deleteRequest from '../../Utils/deleteRequest';

const EventsTab = () => {
    const { t } = useTranslation();
    const eventName = `name${localStorage.getItem('i18nextLng').toUpperCase()}`;
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    useEffect(() => {
        fetchData(URLS.EVENTS, (data) => {
            setEvents(data);
            setFilteredEvents(data);
        });
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredEvents(events);
        } else {
            setFilteredEvents(events.filter(event =>
                event[eventName].toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.organisation.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }, [searchQuery, events]);

    const renderShiftDetails = (shifts) => {
        return shifts.map((shift, index) => (
            <div key={index}>
                <hr />
                <p><strong>Shift {index + 1}:</strong></p>
                <p><strong>Date:</strong> {shift.date}</p>
                <p><strong>Time:</strong> {shift.startTime} - {shift.endTime}</p>
                <p><strong>Capacity:</strong> {shift.capacity}</p>
                <p><strong>Leader Required:</strong> {shift.isLeaderRequired ? 'YES' : 'NO'}</p>
                <p><strong>Minimum Age:</strong> {shift.requiredMinAge ? shift.requiredMinAge : '-'}</p>
                <p><strong>Location:</strong> {shift.shiftDirections ? shift.shiftDirections : '-'}</p>
                <p><strong>Address:</strong> {shift.street}, {shift.homeNum}</p>
                <p><strong>District ID:</strong> {shift.districtId}</p>
            </div>
        ));
    };

    const toggleDetails = (index) => {
        setOpenIndex(openIndex === index ? null : index);
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
        deleteRequest(`${URLS.DELETE_EVENT}/${eventToDelete}`, localStorage.getItem('token'), "Deleted", "Fail")
        setEventToDelete(null);
        setConfirmDelete(false);
    };

    return (
        <div className="overflow-x-auto">
            <div className='admin-panel-add-search-group'>
                <div className="admin-panel-search-bar">
                    <TextInput
                        type="text"
                        placeholder="Search users"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={HiOutlineSearch}
                    />
                </div>
            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Organisation</Table.HeadCell>
                    <Table.HeadCell>{t('categories')}</Table.HeadCell>
                    <Table.HeadCell>City</Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {filteredEvents.map((event, index) => (
                        <React.Fragment key={index}>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {event.id}
                                </Table.Cell>
                                <Table.Cell>{event[eventName]}</Table.Cell>
                                <Table.Cell>{event.organisation}</Table.Cell>
                                <Table.Cell>{event.categories.map((category, index) => index === event.categories.length - 1 ? category : category + ", ")}</Table.Cell>
                                <Table.Cell>{event.city}</Table.Cell>
                                <Table.Cell>
                                    <button
                                        className="details-toggle"
                                        onClick={() => toggleDetails(index)}
                                    >
                                        {openIndex === index ? <VscChevronUp /> : <VscChevronDown />}
                                        <span className="dropdown-label"></span>
                                    </button>
                                </Table.Cell>
                                <Table.Cell>
                                    {event.date > format(new Date(), 'yyyy-MM-dd') ?
                                    <button
                                        className="delete-button"
                                        onClick={() => {
                                            setConfirmDelete(true);
                                            setEventToDelete(event.id);
                                        }}
                                    >
                                        <span><HiTrash /></span>
                                    </button> : ' '}
                                    <Confirmation
                                        id="sign-off"
                                        buttonName="Delete"
                                        title="Czy usunąć"
                                        accept="Tak, usuń"
                                        deny="Anuluj"
                                        styleId="sign-in"
                                        onAgree={() => {
                                            handleUserConfirmation(true);
                                            setConfirmDelete(false);
                                        }}
                                        onDeny={() => {
                                            setConfirmDelete(false);
                                            setEventToDelete(null);
                                        }}
                                        openModal={confirmDelete}
                                        setOpenModal={setConfirmDelete}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            {openIndex === index && (
                                <tr>
                                    <td colSpan="7">
                                        <div className="dropdown-content">
                                            <p><strong>{t('name')} - Polski:</strong> {event.namePL}</p>
                                            <p><strong>{t('name')} - English:</strong> {event.nameEN}</p>
                                            <p><strong>{t('name')} - Українська:</strong> {event.nameUA}</p>
                                            <p><strong>{t('name')} - Русский:</strong> {event.nameRU}</p>
                                            <hr />
                                            <p><strong>Image URL:</strong> {event.imageUrl}</p>
                                            <p><strong>Requires Pesel verification:</strong> {event.peselVerificationRequired ? 'YES' : 'NO'}</p>
                                            <div>{renderShiftDetails(event.shifts)}</div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default EventsTab;
