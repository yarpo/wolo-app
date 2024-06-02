import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';
import { HiOutlineSearch } from "react-icons/hi";
import { TextInput, Card } from "flowbite-react";
import '../../styles/admin-home-page.scss';
import { format } from 'date-fns';
import formatDate from '../../Utils/formatDate';

import { URLS } from '../../config';
import fetchData from '../../Utils/fetchData';
import { HiTrash, HiCheck, HiOutlineX } from "react-icons/hi";

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
    const [eventNameToDelete, setEventNameToDelete] = useState(''); 

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
            <Card className='admin-panel-shift-card-entry' key={index}>
                <div>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {t('shift')} {index + 1}:
                    </h5>
                    <p><strong>{t('time')}:</strong> {shift.startTime} - {shift.endTime}</p>
                    <p><strong>{t('capacity')}:</strong> {shift.capacity}</p>
                    <p><strong>{t('minAgeRequired')}:</strong> {shift.requiredMinAge ? shift.requiredMinAge : <HiOutlineX />}</p>
                    <p><strong>{t('address')}:</strong> {shift.street} {shift.homeNum} {shift.district}</p>
                    <p><strong>{t('addressDirections')}:</strong> {shift.shiftDirections ? shift.shiftDirections : t('none')}</p>
                </div>
            </Card>
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

    const handleDeleteRequest = (event) => {
        setConfirmDelete(true);
        setEventToDelete(event.id);
        setEventNameToDelete(event[eventName]); 
    };

    return (
        <div className="overflow-x-auto">
            <div className='admin-panel-add-search-group'>
                <div className="admin-panel-search-bar">
                    <TextInput
                        type="text"
                        placeholder={t('searchEvents')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={HiOutlineSearch}
                    />
                </div>
            </div>
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>{t('id')}</Table.HeadCell>
                    <Table.HeadCell>{t('name')}</Table.HeadCell>
                    <Table.HeadCell>{t('organisation')}</Table.HeadCell>
                    <Table.HeadCell>{t('categories')}</Table.HeadCell>
                    <Table.HeadCell>{t('city')}</Table.HeadCell>
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
                                <Table.Cell className="table-cell-action">
                                    {event.date > format(new Date(), 'yyyy-MM-dd') ?
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteRequest(event)} 
                                    >
                                        <span><HiTrash /></span>
                                    </button> : ' '}
                                    <Confirmation
                                        id="sign-off"
                                        buttonName="Delete"
                                        title={t('doYouWantToDelete') + ": " + eventNameToDelete + "?"} 
                                        accept={t('delete')}
                                        deny={t('discard')}
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
                                <Table.Cell colSpan="8">
                                    <div className="dropdown-content">
                                        <Card>
                                            <div className="card-content">
                                                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                                                    {event[eventName]}
                                                </h5>
                                                <div className="grid-container">
                                                    <p><strong>{t('name')} - {t('polish')}: </strong>{event.namePL}</p>
                                                    <p><strong>{t('name')} - {t('english')}: </strong>{event.nameEN}</p>
                                                    <p><strong>{t('name')} - {t('ukrainian')}: </strong>{event.nameUA}</p>
                                                    <p><strong>{t('name')} - {t('russian')}: </strong>{event.nameRU}</p>
                                                </div>
                                                <div className="grid-container">
                                                    <p><strong>{t('description')} - {t('polish')}: </strong>{event.descriptionPL}</p>
                                                    <p><strong>{t('description')} - {t('english')}: </strong>{event.descriptionEN}</p>
                                                    <p><strong>{t('description')} - {t('ukrainian')}: </strong>{event.descriptionUA}</p>
                                                    <p><strong>{t('description')} - {t('russian')}: </strong>{event.descriptionRU}</p>
                                                </div>
                                                <div className="grid-container-2">
                                                    <div className="grid-item">
                                                        <p><strong>{t('city')}: </strong>{event.city}</p>
                                                    </div>
                                                    <div className="grid-item">
                                                        <p><strong>{t('date')}: </strong>{formatDate(event.date)}</p>
                                                    </div>
                                                </div>
                                                <div className="grid-container-2">
                                                    <div className="grid-item">
                                                        <p><strong>{t('peselVerified')}: </strong>{event.peselVerification ? <HiCheck /> : <HiOutlineX />}</p>
                                                    </div>
                                                    <div className="grid-item">
                                                        <p><strong>{t('agreementSigned')}: </strong>{event.agreementSigned ? <HiCheck /> : <HiOutlineX />}</p>
                                                    </div>
                                                </div>
                                                <div className="grid-container">
                                                    <p><strong>{t('imageUrl')}: </strong>{event.imageUrl}</p>
                                                </div>
                                                <div className='admin-panel-shift-card'>{renderShiftDetails(event.shifts)}</div>
                                            </div>
                                        </Card>
                                    </div>
                                </Table.Cell>
                            )}
                        </React.Fragment>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default EventsTab;
