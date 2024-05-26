import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/settings.scss';
import fetchUser from '../../Utils/fetchUser';
import fetchData from '../../Utils/fetchData.js';
import fetchDataWithAuth from '../../Utils/fetchDataWithAuth.js';
import putRequest from '../../Utils/putRequest';
import { URLS } from '../../config';
import 'react-toastify/dist/ReactToastify.css';

const OrganiserSettings = () => {
    const { t } = useTranslation();
    const [organisationId, setOrganisationId] = useState(null);
    const [organisationData, setOrganisationData] = useState(null); 
    const [editMode, setEditMode] = useState(false);
    const [editedOrganisationData, setEditedOrganisationData] = useState({});
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem('token');
    const [districts, setDistricts] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        fetchUser().then(data => {
            if (data) {
                setOrganisationId(data.organisationId);
            }
        });
    }, []);

    useEffect(() => {
        if (organisationId) {
            const url = `${URLS.ORGANISATIONS}/${organisationId}`;
            fetchData(url, (data) => {
                setOrganisationData(data);
                setEditedOrganisationData(data);
            });
        }

        fetchData(URLS.DISTRICTS, setDistricts);
        fetchDataWithAuth(URLS.CITIES, setCities, token)
    }, [organisationId, token]);

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
        
        if (!editedOrganisationData.phoneNumber || editedOrganisationData.phoneNumber.length < 9) {
            newErrors.phoneNumber = t('invalidPhoneNumber');
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!editedOrganisationData.email || !emailRegex.test(editedOrganisationData.email)) {
            newErrors.email = t('invalidEmailFormat');
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const filteredData = {
            name: editedOrganisationData.name,
            descriptionPL: editedOrganisationData.descriptionPL,
            descriptionEN: editedOrganisationData.descriptionEN,
            descriptionUA: editedOrganisationData.descriptionUA,
            descriptionRU: editedOrganisationData.descriptionRU,
            phoneNumber: editedOrganisationData.phoneNumber,
            email: editedOrganisationData.email,
            street: editedOrganisationData.street,
            homeNum: editedOrganisationData.homeNum,
            logoUrl: editedOrganisationData.logoUrl,
            districtId: editedOrganisationData.districtId,
            cityId: editedOrganisationData.cityId
        };

        console.log("Saving edited user data:", filteredData);
        putRequest(`${URLS.ORGANISATION_EDIT}`, localStorage.getItem('token'), filteredData, t('organisationDataEditedSuccess'), t('organisationDataEditedFail'));
        setEditMode(false);
    };

    const handleDiscardClick = () => {
        setErrors({});
        setEditedOrganisationData(organisationData);
        setEditMode(false);
    };

    return (
        <div className="settings-page">
            <div className="settings-container">
                <h1>{t('organiserSettings')}</h1>
                {organisationData && (
                    <div className="settings-data-container">
                        <div className="settings-row">
                            <div className="label">{t('organisationName')}:</div>
                            {editMode ? (
                                <>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editedOrganisationData.name || ''}
                                        onChange={handleInputChange}
                                    />
                                    {errors.name && <div className="settings-error">{errors.name}</div>}
                                </>
                            ) : (
                                <div className="value">{organisationData.name}</div>
                            )}
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('description')} - polski:</div>
                            {editMode ? (
                                <>
                                    <textarea
                                        name="descriptionPL"
                                        value={editedOrganisationData.descriptionPL || ''}
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <div className="value">{organisationData.descriptionPL}</div>
                            )}
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('description')} - english:</div>
                            {editMode ? (
                                <>
                                    <textarea
                                        name="descriptionEN"
                                        value={editedOrganisationData.descriptionEN || ''}
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <div className="value">{organisationData.descriptionEN}</div>
                            )}
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('description')} - Українська:</div>
                            {editMode ? (
                                <>
                                    <textarea
                                        name="descriptionUA"
                                        value={editedOrganisationData.descriptionUA || ''}
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <div className="value">{organisationData.descriptionUA}</div>
                            )}
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('description')} - Русский:</div>
                            {editMode ? (
                                <>
                                    <textarea
                                        name="descriptionRU"
                                        value={editedOrganisationData.descriptionRU || ''}
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <div className="value">{organisationData.descriptionRU}</div>
                            )}
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('phoneNumber')}:</div>
                            {editMode ? (
                                <>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={editedOrganisationData.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                    {errors.phoneNumber && <div className="settings-error">{errors.phoneNumber}</div>}
                                </>
                            ) : (
                                <div className="value">{organisationData.phoneNumber}</div>
                            )}
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('email')}:</div>
                            {editMode ? (
                                <>
                                    <input
                                        type="text"
                                        name="email"
                                        value={editedOrganisationData.email || ''}
                                        onChange={handleInputChange}
                                    />
                                    {errors.email && <div className="settings-error">{errors.email}</div>}
                                </>
                            ) : (
                                <div className="value">{organisationData.email}</div>
                            )}
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('address')}:</div>
                            {editMode ? (
                                <>
                                    <div>
                                        <input
                                            type="text"
                                            name="street"
                                            value={editedOrganisationData.street || ''}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="number"
                                            name="homeNum"
                                            value={editedOrganisationData.homeNum || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="value">{organisationData.street} {organisationData.homeNum}</div>
                            )}
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('district')}:</div>
                            {editMode ? (
                                <>
                                    <select
                                        name="districtId"
                                        value={editedOrganisationData.districtId || ''}
                                        onChange={handleInputChange}
                                    >
                                        {districts.map(district => (
                                            <option key={district.id} value={district.id}>
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            ) : (
                                <div className="value">
                                    {districts.find(district => district.id === organisationData.districtId)?.name || organisationData.districtId}
                                </div>
                            )}
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('city')}:</div>
                            {editMode ? (
                                <>
                                    <select
                                        name="cityId"
                                        value={editedOrganisationData.cityId || ''}
                                        onChange={handleInputChange}
                                    >
                                        {cities.map(city => (
                                            <option key={city.id} value={city.id}>
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            ) : (
                                <div className="value">
                                    {cities.find(city => city.id === organisationData.cityId)?.name || organisationData.cityId}
                                </div>
                            )}
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('logoUrl')}:</div>
                            {editMode ? (
                                <>
                                    <input
                                        type="text"
                                        name="logoUrl"
                                        value={editedOrganisationData.logoUrl || ''}
                                        onChange={handleInputChange}
                                    />
                                </>
                            ) : (
                                <div className="value">{organisationData.logoUrl}</div>
                            )}
                        </div>
                    </div>
                )}
                {editMode ? (
                    <div className='settings_confirm_buttons_group'>
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
