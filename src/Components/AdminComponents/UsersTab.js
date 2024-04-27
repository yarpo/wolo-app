import React, { useState, useEffect } from 'react';
import '../../styles/admin-home-page.scss';
import { URLS } from '../../config';
import fetchDataWithAuth from '../../Utils/fetchDataWithAuth.js';
import { Table } from "flowbite-react";

const UsersTab = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchDataWithAuth(URLS.USERS, setUsers, token)
    }, [token]);
    

    return (
        <div className="overflow-x-auto">
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>User Name</Table.HeadCell>
                    <Table.HeadCell>User Email</Table.HeadCell>
                    <Table.HeadCell>User Phone</Table.HeadCell>
                    <Table.HeadCell>User roles</Table.HeadCell>
                    <Table.HeadCell>Organisation Moderator</Table.HeadCell>
                    <Table.HeadCell>Adult</Table.HeadCell>
                    <Table.HeadCell>Pesel Verified</Table.HeadCell>
                    <Table.HeadCell>Agreement Signed</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {users.map((user, index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {user.id}
                            </Table.Cell>
                            <Table.Cell>{user.firstName} {user.lastName}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.phoneNumber}</Table.Cell>
                            <Table.Cell>{user.roles.join(', ')}</Table.Cell>
                            <Table.Cell>{user.organisationName ? user.organisationName : '-'}</Table.Cell>
                            <Table.Cell>{user.adult ? 'YES' : 'NO'}</Table.Cell>
                            <Table.Cell>{user.peselVerified ? 'YES' : 'NO'}</Table.Cell>
                            <Table.Cell>{user.agreementSigned ? 'YES' : 'NO'}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
};

export default UsersTab;