import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import '../../../styles/admin-organisations-page.scss';

const AdminOrganisationsPage = () => {
    const { t, i18n } = useTranslation();
    const [organisations, setOrganisations] = useState([]);
    const [editedOrganisationId, setEditedOrganisationId] = useState(null);
    const [editedOrganisationData, setEditedOrganisationData] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        email: '',
        phoneNumber: '',
        street: '',
        homeNum: '',
        addressDescription: '',
        districtId: null,
        moderatorId: null,
        logoUrl: '',
    });
    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/organisations');
                const data = await response.json();
                setOrganisations(data);
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
            const response = await fetch('http://localhost:8080/organisations/add', {
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
    const handleEditClick = (organisationId) => {
        setEditedOrganisationId(organisationId);
        const editedOrganisation = organisations.find((organisation) => organisation.id === organisationId);
        setEditedOrganisationData(editedOrganisation);
    };

    const handleDeleteClick = async (organisationId) => {
        try {
            await fetch(`http://localhost:8080/organisations/delete/${organisationId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setOrganisations(organisations.filter((organisation) => organisation.id !== organisationId));
        } catch (error) {
            console.error('Error deleting organisation:', error);
        }
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`http://localhost:8080/organisations/${editedOrganisationId}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedOrganisationData),
            });

            const responseBody = await response.text();
            if (response.ok) {
                const updatedOrganisations = [...organisations];
                const index = updatedOrganisations.findIndex((organisation) => organisation.id === editedOrganisationId);
                updatedOrganisations[index] = editedOrganisationData;
                setOrganisations(updatedOrganisations);

                setEditedOrganisationId(null);
                setEditedOrganisationData({});
            } else {
                console.error('Error updating organisation:', responseBody);
            }
        } catch (error) {
            console.error('Error updating organisation:', error);
        }
    };

    const handleCancelClick = () => {
        setEditedOrganisationId(null);
        setEditedOrganisationData({});
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
                            <h1>{t(`Organisations List`)}</h1>

                            <table className="table">
                                <thead>
                                <tr>
                                    {organisations.length > 0 &&
                                        Object.keys(organisations[0]).map((key) => <th key={key}>{t(`tableHeaders.${key}`)}</th>)}
                                    <th>{t('tableHeaders.actions')}</th>
                                </tr>
                                </thead>
                                <tbody>
                                {organisations.map((organisation) => (
                                    <tr key={organisation.id}>
                                        {Object.keys(organisation).map((key) => (
                                            <td key={key}>
                                                {key !== 'id' ? (
                                                    <>
                                                        {editedOrganisationId === organisation.id ? (
                                                            <input
                                                                type="text"
                                                                value={editedOrganisationData[key] || ''}
                                                                onChange={(e) =>
                                                                    setEditedOrganisationData({ ...editedOrganisationData, [key]: e.target.value })
                                                                }
                                                            />

                                                        ) : (
                                                            String(organisation[key])
                                                        )}
                                                    </>
                                                ) : (
                                                    String(organisation[key])
                                                )}
                                            </td>
                                        ))}
                                        <td>
                                            {editedOrganisationId === organisation.id ? (
                                                <>
                                                    <button onClick={handleSaveClick}>{t('userActions.save')}</button>
                                                    <></>
                                                    <button onClick={handleCancelClick}>{t('userActions.cancel')}</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEditClick(organisation.id)}>{t('userActions.edit')}</button>
                                                    <></>
                                                    <button onClick={() => handleDeleteClick(organisation.id)}>{t('userActions.delete')}</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <form onSubmit={handleSubmit}>
                                {Object.keys(formData).map((key) => {
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

export default AdminOrganisationsPage;
