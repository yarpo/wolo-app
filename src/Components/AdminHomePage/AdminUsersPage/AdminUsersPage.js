import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import '../../../styles/admin-home-page.scss';

const AdminUsersPage = () => {
    const { t, i18n } = useTranslation();
    const [users, setUsers] = useState([]);
    const [editedUserId, setEditedUserId] = useState(null);
    const [editedUserData, setEditedUserData] = useState({});
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch('http://localhost:8080/roles');
                const data = await response.json();
                setRoles(data);
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);

    const handleEditClick = (userId) => {
        setEditedUserId(userId);
        const editedUser = users.find((user) => user.id === userId);
        setEditedUserData(editedUser);
    };

    const handleDeleteClick = async (userId) => {
        try {
            await fetch(`http://localhost:8080/users/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setUsers(users.filter((user) => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`http://localhost:8080/users/${editedUserId}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedUserData),
            });

            const responseBody = await response.text();
            if (response.ok) {
                const updatedUsers = [...users];
                const index = updatedUsers.findIndex((user) => user.id === editedUserId);
                updatedUsers[index] = editedUserData;
                setUsers(updatedUsers);

                setEditedUserId(null);
                setEditedUserData({});
            } else {
                console.error('Error updating user:', responseBody);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleCancelClick = () => {
        setEditedUserId(null);
        setEditedUserData({});
    };

    const handleToggleValue = (key) => {
        setEditedUserData({ ...editedUserData, [key]: !editedUserData[key] });
    };

    return (
        <div className='admin_home_page_container'>
            <div id="admin_home_page_background_photo">
                <div id="admin_home_page_welcome_text">
                    <div>
                        <h1>{t('hello')} user. {t('welcomeToWoloApp')}</h1>
                    </div>
                    <div>
                        <h2>{t('yourAccountStatus')}: administartor</h2>
                    </div>
                </div>
            </div>
            <div id='admin_home_page_content'>
                <div id="admin_home_page_events_to_approve">
                    <div id="admin_home_page_events_container">
                        <div>
                            <h1>Users List</h1>

                            <table className="user-table">
                                <thead>
                                <tr>
                                    {users.length > 0 &&
                                        Object.keys(users[0]).map((key) => <th key={key}>{key}</th>)}
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        {Object.keys(user).map((key) => (
                                            <td key={key}>
                                                {key !== 'id' ? (
                                                    <>
                                                        {editedUserId === user.id ? (
                                                            typeof user[key] === 'boolean' ? (
                                                                <button onClick={() => handleToggleValue(key)}>
                                                                    {editedUserData[key] ? 'True' : 'False'}
                                                                </button>
                                                            ) : key === 'roleDto' ? (
                                                                <select
                                                                    value={editedUserData.roleDto ? editedUserData.roleDto.id : ''}
                                                                    onChange={(e) =>
                                                                        setEditedUserData({
                                                                            ...editedUserData,
                                                                            roleDto: {
                                                                                id: e.target.value,
                                                                                name: roles.find((role) => role.id === Number(e.target.value)).name,
                                                                            },
                                                                        })
                                                                    }
                                                                >
                                                                    <option value="">Select Role</option>
                                                                    {roles.map((role) => (
                                                                        <option key={role.id} value={role.id}>
                                                                            {role.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            ) : (
                                                                <input
                                                                    type="text"
                                                                    value={editedUserData[key] || ''}
                                                                    onChange={(e) =>
                                                                        setEditedUserData({ ...editedUserData, [key]: e.target.value })
                                                                    }
                                                                />
                                                            )
                                                        ) : (
                                                            typeof user[key] === 'boolean' ? (
                                                                <button onClick={() => handleToggleValue(key)}>
                                                                    {user[key] ? 'True' : 'False'}
                                                                </button>
                                                            ) : key === 'roleDto' ? (
                                                                String(user[key].name)
                                                            ) : (
                                                                String(user[key])
                                                            )
                                                        )}
                                                    </>
                                                ) : (
                                                    String(user[key])
                                                )}
                                            </td>
                                        ))}
                                        <td>
                                            {editedUserId === user.id ? (
                                                <>
                                                    <button onClick={handleSaveClick}>Save</button>
                                                    <button onClick={handleCancelClick}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEditClick(user.id)}>Edit</button>
                                                    <button onClick={() => handleDeleteClick(user.id)}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUsersPage;
