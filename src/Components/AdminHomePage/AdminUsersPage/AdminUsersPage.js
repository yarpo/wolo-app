import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../styles/admin-home-page.scss';

const AdminUsersPage = () => {
    const { t, i18n } = useTranslation();
    const [users, setUsers] = useState([]);
    const [editedUserId, setEditedUserId] = useState(null);
    const [editedUserData, setEditedUserData] = useState({});
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({});

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
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue,
        });
    };
    const handleRoleDtoChange = (e) => {
        const selectedRoleId = e.target.value;

        setFormData({
            ...formData,
            roleDto: {
                id: selectedRoleId,
                name: roles.find((role) => role.id === Number(selectedRoleId)).name,
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });


            console.log('Response:', response);
        } catch (error) {
            console.error('Error:', error);
        }
    };
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
        <div className="admin_home_page_container">
            <div id="admin_home_page_background_photo">
                <div id="admin_home_page_welcome_text">
                    <div>
                        <h1>
                            {t('hello')} user. {t('welcomeToWoloApp')}
                        </h1>
                    </div>
                    <div>
                        <h2>{t('yourAccountStatus')}: administartor</h2>
                    </div>
                </div>
            </div>
            <div id="admin_home_page_content">
                <div id="admin_home_page_events_to_approve">
                    <div id="admin_home_page_events_container">
                        <div>
                            <h1>{t('Users List')}</h1>

                            <table className="user-table">
                                <thead>
                                <tr>
                                    {users.length > 0 &&
                                        Object.keys(users[0]).map((key) => (
                                            <th key={key}>{t(`tableHeaders.${key}`)}</th>
                                        ))}
                                    <th>{t('tableHeaders.actions')}</th>
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
                                                                    {editedUserData[key] ? t('True') : t('False')}
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
                                                                    <option value="">{t('Select Role')}</option>
                                                                    {roles.map((role) => (
                                                                        <option key={role.id} value={role.id}>
                                                                            {t(`roles.${role.name}`)}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            ) : (
                                                                <input
                                                                    type="text"
                                                                    value={editedUserData[key] || ''}
                                                                    onChange={(e) =>
                                                                        setEditedUserData({
                                                                            ...editedUserData,
                                                                            [key]: e.target.value,
                                                                        })
                                                                    }
                                                                />
                                                            )
                                                        ) : (
                                                            typeof user[key] === 'boolean' ? (
                                                                t(`userStatus.${key}.${user[key] ? 'true' : 'false'}`)
                                                            ) : key === 'roleDto' ? (
                                                                t(`userStatus.roles.${user[key].name}`)
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
                                                    <button onClick={handleSaveClick}>{t('userActions.save')}</button>
                                                    <button onClick={handleCancelClick}>{t('userActions.cancel')}</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEditClick(user.id)}>{t('userActions.edit')}</button>
                                                    <button onClick={() => handleDeleteClick(user.id)}>{t('userActions.delete')}</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <form onSubmit={handleSubmit}>
                                {users.length > 0 &&
                                    Object.keys(users[0]).map((key) => {
                                        if (key !== 'id') {
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={key}>{t(`tableHeaders.${key}`)}</label>


                                                    {key === 'roleDto' && (
                                                        <select
                                                            id={key}
                                                            name={key}
                                                            onChange={handleRoleDtoChange}
                                                            value={formData.roleDto ? formData.roleDto.id : ''}
                                                        >
                                                            <option value="">{t('Select Role')}</option>
                                                            {roles.map((role) => (
                                                                <option key={role.id} value={role.id}>
                                                                    {t(`roles.${role.name}`)}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}


                                                    {typeof users[0][key] === 'boolean' && (
                                                        <input
                                                            type="checkbox"
                                                            id={key}
                                                            name={key}
                                                            onChange={handleChange}
                                                            checked={formData[key] || false}
                                                        />
                                                    )}


                                                    {key !== 'roleDto' && typeof users[0][key] !== 'boolean' && (
                                                        <input
                                                            type="text"
                                                            id={key}
                                                            name={key}
                                                            onChange={handleChange}
                                                            value={formData[key] || ''}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        }

                                    })}
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUsersPage;
