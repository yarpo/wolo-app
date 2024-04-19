import React, { useState, useEffect } from 'react';
import '../../styles/admin-home-page.scss';

import { URLS } from '../../config';
import fetchData  from  '../../Utils/fetchData';

import { Table } from "flowbite-react";

const EventsTab = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchData(URLS.EVENTS, setEvents);
    }, []);

    return (
        <div className="overflow-x-auto">
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Organisation</Table.HeadCell>
                    <Table.HeadCell>Categories</Table.HeadCell>
                    <Table.HeadCell>City</Table.HeadCell>
                    <Table.HeadCell>Requires Pesel verification</Table.HeadCell>
                    <Table.HeadCell>Shifts</Table.HeadCell>
                    <Table.HeadCell>Image URL</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {events.map((event, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {event.id}
                            </Table.Cell>
                            <Table.Cell>{event.name}</Table.Cell>
                            <Table.Cell>{event.organisation}</Table.Cell>
                            <Table.Cell>{event.categories}</Table.Cell>
                            <Table.Cell>{event.city}</Table.Cell>
                            <Table.Cell>{event.peselVerificationRequired ? 'YES' : 'NO'}</Table.Cell>
                            <Table.Cell>
                                {event.shifts.map((shift, index) => (
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
                                ))}
                            </Table.Cell>
                            <Table.Cell>{event.imageUrl}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
};

export default EventsTab;