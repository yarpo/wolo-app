import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import '../../../styles/admin-districts-page.scss';

const AdminDistrictsPage = () => {
    const { t, i18n } = useTranslation();
    const [Districts, setDistricts] = useState([]);
    const [editedDistrictId, setEditedDistrictId] = useState(null);
    const [editedDistrictData, setEditedDistrictData] = useState({});
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
                const response = await fetch('http://localhost:8080/districts');
                const data = await response.json();
                setDistricts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/districts/add', {
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

    const handleEditClick = (districtId) => {
        setEditedDistrictId(districtId);
        const editedDistrict = Districts.find((district) => district.id === districtId);
        setEditedDistrictData(editedDistrict);
    };

    const handleDeleteClick = async (districtId) => {
        try {
            await fetch(`http://localhost:8080/districts/delete/${districtId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setDistricts(Districts.filter((district) => district.id !== districtId));
        } catch (error) {
            console.error('Error deleting district:', error);
        }
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`http://localhost:8080/districts/${editedDistrictId}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedDistrictData),
            });

            const responseBody = await response.text();
            if (response.ok) {
                const updatedDistricts = [...Districts];
                const index = updatedDistricts.findIndex((district) => district.id === editedDistrictId);
                updatedDistricts[index] = editedDistrictData;
                setDistricts(updatedDistricts);

                setEditedDistrictId(null);
                setEditedDistrictData({});
            } else {
                console.error('Error updating district:', responseBody);
            }
        } catch (error) {
            console.error('Error updating district:', error);
        }
    };

    const handleCancelClick = () => {
        setEditedDistrictId(null);
        setEditedDistrictData({});
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
                            <h1>{t(`Districts List`)}</h1>

                            <table className="table">
                                <thead>
                                <tr>
                                    {Districts.length > 0 &&
                                        Object.keys(Districts[0]).map((key) => <th key={key}>{t(`tableHeaders.${key}`)}</th>)}
                                    <th>{t('tableHeaders.actions')}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Districts.map((district) => (
                                    <tr key={district.id}>
                                        {Object.keys(district).map((key) => (
                                            <td key={key}>
                                                {key !== 'id' ? (
                                                    <>
                                                        {editedDistrictId === district.id ? (
                                                            <input
                                                                type="text"
                                                                value={editedDistrictData[key] || ''}
                                                                onChange={(e) =>
                                                                    setEditedDistrictData({ ...editedDistrictData, [key]: e.target.value })
                                                                }
                                                            />

                                                        ) : (
                                                            String(district[key])
                                                        )}
                                                    </>
                                                ) : (
                                                    String(district[key])
                                                )}
                                            </td>
                                        ))}
                                        <td>
                                            {editedDistrictId === district.id ? (
                                                <>
                                                    <button onClick={handleSaveClick}>{t('userActions.save')}</button>
                                                    <></>
                                                    <button onClick={handleCancelClick}>{t('userActions.cancel')}</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEditClick(district.id)}>{t('userActions.edit')}</button>
                                                    <></>
                                                    <button onClick={() => handleDeleteClick(district.id)}>{t('userActions.delete')}</button> </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <form onSubmit={handleSubmit}>
                                {Districts.length > 0 &&
                                    Object.keys(Districts[0]).map((key) => {

                                        if (key !== 'id') {
                                            return (
                                                <div key={key}>
                                                    <label htmlFor={key}>{t(`tableHeaders.${key}`)}</label>
                                                    <input
                                                        type="text"
                                                        id={key}
                                                        name={key}
                                                        onChange={handleChange}
                                                        value={formData[key] || ''}
                                                    />
                                                </div>
                                            );
                                        }

                                    })}
                                <button type="submit">{t('Add')}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDistrictsPage;
