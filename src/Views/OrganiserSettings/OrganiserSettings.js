import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/settings.scss';
import fetchUser from '../../Utils/fetchUser';
import fetchData from '../../Utils/fetchData.js';
// import putRequest from '../../Utils/putRequest';
import { URLS } from '../../config';
import 'react-toastify/dist/ReactToastify.css';

const OrganiserSettings = () => {
    const { t } = useTranslation();
    const [organisationId, setOrganisationId] = useState(null)
    const [organisationData, setOrganisationData] = useState([]); 
    const [editMode, setEditMode] = useState(false);
    const [editedOrganisationData, setEditedOrganisationData] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchUser().then(data => {
            if (data) {
                setOrganisationId(data.organisationId);
            }

            if (organisationId){
                const url = `${URLS.ORGANISATIONS}/${organisationId}`;
                fetchData(url, setOrganisationData);
            }
            setEditedOrganisationData(organisationData);
        });
    }, [organisationId, organisationData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedOrganisationData(prevData => ({
            ...prevData,
            [name]: value
        }));
        
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: null
        }));
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {

        const newErrors = {};

        if (editedOrganisationData.name.length < 3) {
            newErrors.name = t('invalidNameFormat');
        }

        const filteredUserData = {
            name: editedOrganisationData.name
        };

        console.log("Saving edited user data:", filteredUserData);
        // putRequest(`${URLS.USERS}/edit`, localStorage.getItem('token'), filteredUserData, t('userDataChangedSucess'), t('userDataChangedFail'));
        setEditMode(false);
    };

    const handleDiscardClick = () => {
        setEditedOrganisationData(organisationData);
        setEditMode(false);
    }

    return (
        <div className="settings-page">
            <div className="settings-container">
                <h1>{t('settings')}</h1>
                {organisationData && (
                    <div className="settings-data-container">
                        <div className="settings-row">
                            <div className="label">{t('organisationName')}:</div>
                            {editMode ? (
                                <>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedOrganisationData.name}
                                        onChange={handleInputChange}
                                    />
                                    {errors.name && <div className="settings-error">{errors.name}</div>}
                                </>
                            ) : (
                                <div className="value">{organisationData.name}</div>
                            )}
                        </div>
                    </div>
                )}
                {editMode ? (
                    <div className='settngs_confirm_buttons_group'>
                        <button className="settings_edit_button" onClick={handleSaveClick}>
                            {t('accept')}
                        </button>
                        <button className="settings_delete_button" onClick={handleDiscardClick}>
                            {t('discard')}
                        </button>
                    </div>
                ) : (
                    <button className="settings_edit_button" onClick={handleEditClick}>
                        {t('edit')}
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrganiserSettings;
