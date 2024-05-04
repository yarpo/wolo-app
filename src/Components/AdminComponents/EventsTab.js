import React, { useState, useEffect } from 'react';
import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';
import '../../styles/admin-home-page.scss';

import { URLS } from '../../config';
import fetchData from '../../Utils/fetchData';

import { Table } from "flowbite-react";

const EventsTab = () => {
    const [events, setEvents] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    useEffect(() => {
        fetchData(URLS.EVENTS, setEvents);
    }, []);

    const renderShiftDetails = (shifts) => {
        return shifts.map((shift, index) => (
            <div key={index}>
                <p><strong>Shift {index + 1}:</strong></p>
                <p><strong>Date:</strong> {shift.date}</p>
                <p><strong>Time:</strong> {shift.startTime} - {shift.endTime}</p>
                <p><strong>Capacity:</strong> {shift.capacity}</p>
                <p><strong>Leader Required:</strong> {shift.isLeaderRequired ? 'YES' : 'NO'}</p>
                <p><strong>Minimum Age:</strong> {shift.requiredMinAge ? shift.requiredMinAge : '-'}</p>
                <p><strong>Location:</strong> {shift.shiftDirections ? shift.shiftDirections : '-'}</p>
                <p><strong>Address:</strong> {shift.street}, {shift.homeNum}</p>
                <p><strong>District ID:</strong> {shift.districtId}</p>
                <hr />
            </div>
        ));
    };

    const toggleDetails = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="overflow-x-auto">
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Organisation</Table.HeadCell>
                    <Table.HeadCell>Categories</Table.HeadCell>
                    <Table.HeadCell>City</Table.HeadCell>
                    <Table.HeadCell>More</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {events.map((event, index) => (
                        <React.Fragment key={index}>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {event.id}
                                </Table.Cell>
                                <Table.Cell>{event.name}</Table.Cell>
                                <Table.Cell>{event.organisation}</Table.Cell>
                                <Table.Cell>{event.categories}</Table.Cell>
                                <Table.Cell>{event.city}</Table.Cell>
                                <Table.Cell>
                                    <button
                                        className="details-toggle"
                                        onClick={() => toggleDetails(index)}
                                    >
                                        {openIndex === index ? <VscChevronUp /> : <VscChevronDown />}
                                        <span className="dropdown-label">Details</span>
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                            {openIndex === index && (
                                <tr>
                                    <td colSpan="6">
                                        <div className="dropdown-content">
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
