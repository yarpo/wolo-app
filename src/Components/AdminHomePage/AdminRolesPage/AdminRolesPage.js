import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import '../../../styles/admin-home-page.scss';

const AdminRolesPage = () => {
    const { t, i18n } = useTranslation();
    const [roles, setRoles] = useState([]);
    const [editedRoleId, setEditedRoleId] = useState(null);
    const [editedRoleData, setEditedRoleData] = useState({});

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/roles');
                const data = await response.json();
                setRoles(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleEditClick = (roleId) => {
        setEditedRoleId(roleId);
        const editedRole = roles.find((role) => role.id === roleId);
        setEditedRoleData(editedRole);
    };

    const handleDeleteClick = async (roleId) => {
        try {
            await fetch(`http://localhost:8080/roles/delete/${roleId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setRoles(roles.filter((role) => role.id !== roleId));
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`http://localhost:8080/roles/${editedRoleId}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedRoleData),
            });

            const responseBody = await response.text();
            if (response.ok) {
                const updatedRoles = [...roles];
                const index = updatedRoles.findIndex((role) => role.id === editedRoleId);
                updatedRoles[index] = editedRoleData;
                setRoles(updatedRoles);

                setEditedRoleId(null);
                setEditedRoleData({});
            } else {
                console.error('Error updating role:', responseBody);
            }
        } catch (error) {
            console.error('Error updating role:', error);
        }
    };

    const handleCancelClick = () => {
        setEditedRoleId(null);
        setEditedRoleData({});
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
                            <h1>Roles List</h1>

                            <table className="role-table">
                                <thead>
                                <tr>
                                    {roles.length > 0 &&
                                        Object.keys(roles[0]).map((key) => <th key={key}>{key}</th>)}
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {roles.map((role) => (
                                    <tr key={role.id}>
                                        {Object.keys(role).map((key) => (
                                            <td key={key}>
                                                {key !== 'id' ? (
                                                    <>
                                                        {editedRoleId === role.id ? (
                                                            <input
                                                                type="text"
                                                                value={editedRoleData[key] || ''}
                                                                onChange={(e) =>
                                                                    setEditedRoleData({ ...editedRoleData, [key]: e.target.value })
                                                                }
                                                            />

                                                        ) : (
                                                            String(role[key])
                                                        )}
                                                    </>
                                                ) : (
                                                    String(role[key])
                                                )}
                                            </td>
                                        ))}
                                        <td>
                                            {editedRoleId === role.id ? (
                                                <>
                                                    <button onClick={handleSaveClick}>Save</button>
                                                    <></>
                                                    <button onClick={handleCancelClick}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEditClick(role.id)}>Edit</button>
                                                    <></>
                                                    <button onClick={() => handleDeleteClick(role.id)}>Delete</button>
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

export default AdminRolesPage;
