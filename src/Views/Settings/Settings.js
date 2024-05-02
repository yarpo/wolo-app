import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/settings.scss';
import fetchUser from '../../Utils/fetchUser';
import putRequest from '../../Utils/putRequest';
import { URLS } from '../../config';
import Confirmation from '../../Components/Popups/Confirmation.js';

const Settings = () => {
    const { t } = useTranslation();
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedUserData, setEditedUserData] = useState({});
    const [errors, setErrors] = useState({});
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);

    useEffect(() => {
        fetchUser().then(data => {
            if (data) {
                setUserData(data);
                setEditedUserData(data);
            }
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData(prevData => ({
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
        const phoneNumberRegex = /^\d{9}$/;
        const nameRegex = /^[a-zA-Z]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const newErrors = {};

        // validation 
        if (!phoneNumberRegex.test(editedUserData.phoneNumber)) {
            newErrors.phoneNumber = t('invalidPhoneNumberFormat');
        }

        if (!nameRegex.test(editedUserData.firstName)) {
            newErrors.firstName = t('invalidNameFormat');
        }
        if (!nameRegex.test(editedUserData.lastName)) {
            newErrors.lastName = t('invalidNameFormat');
        }

        if (!emailRegex.test(editedUserData.email)) {
            newErrors.email = t('invalidEmailFormat');
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const filteredUserData = {
            firstName: editedUserData.firstName,
            lastName: editedUserData.lastName,
            email: editedUserData.email,
            phoneNumber: editedUserData.phoneNumber,
            isAdult: editedUserData.adult
        };

        console.log("Saving edited user data:", filteredUserData);
        putRequest(`${URLS.USERS}/${userData.id}/edit`, localStorage.getItem('token'), filteredUserData, "Zmieniono dane", "Nie")
        setUserData(editedUserData);
        setEditMode(false);
    };

    const handleDiscardClick = () => {
        setEditedUserData(userData);
        setEditMode(false);
    }

    const handleUserConfirmation = async (confirmation) => {
        setUserConfirmed(confirmation);

    };

    useEffect(() => {
        if (userConfirmed !== false) {
            setUserConfirmed(false);
            handleDelete()
        }
    }, [userConfirmed]); 

    const handleDelete = () => {
        console.log("Delete confirmed");
        setConfirmDelete(false);
    };

    return (
        <div className="settings-page">
            <div className="settings-container">
                <h1>{t('settings')}</h1>
                {userData && (
                    <div className="settings-data-container">
                        <div className="settings-row">
                            <div className="label">{t('firstName')}:</div>
                            {editMode ? (
                                <>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={editedUserData.firstName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.firstName && <div className="settings-error">{errors.firstName}</div>}
                                </>
                            ) : (
                                <div className="value">{userData.firstName}</div>
                            )}
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('lastName')}:</div>
                            {editMode ? (
                                <>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={editedUserData.lastName}
                                        onChange={handleInputChange}
                                    />
                                    {errors.lastName && <div className="settings-error">{errors.lastName}</div>}
                                </>
                            ) : (
                                <div className="value">{userData.lastName}</div>
                            )}
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('email')}:</div>
                            {editMode ? (
                                <>
                                    <input
                                        type="text"
                                        name="email"
                                        value={editedUserData.email}
                                        onChange={handleInputChange}
                                    />
                                    {errors.email && <div className="settings-error">{errors.email}</div>}
                                </>
                            ) : (
                                <div className="value">{userData.email}</div>
                            )}
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('phoneNumber')}:</div>
                            {editMode ? (
                                <>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        value={editedUserData.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                    {errors.phoneNumber && <div className="settings-error">{errors.phoneNumber}</div>}
                                </>
                            ) : (
                                <div className="value">{userData.phoneNumber}</div>
                            )}
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('isAdult')}:</div>
                            {editMode ? (
                                <select
                                    name="isAdult"
                                    value={editedUserData.isAdult}
                                    onChange={handleInputChange}
                                >
                                    <option value={true}>{t('yes')}</option>
                                    <option value={false}>{t('no')}</option>
                                </select>
                            ) : (
                                <div className="value">{userData.adult ? t('yes') : t('no')}</div>
                            )}
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('peselVerified')}:</div>
                            <div className="value">{userData.peselVerified ? t('yes') : t('no') }</div>
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('agreementSigned')}:</div>
                            <div className="value">{userData.agreementSigned ? t('yes') : t('no') }</div>
                        </div>
                        <div className="settings-row">
                            <div className="label">{t('organisationName')}:</div>
                            <div className="value">{userData.organisationName ? userData.organisationName : t('none')}</div>
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
                <button className="settings_delete_button" onClick={() => setConfirmDelete(true)}> {t('deactivateAccount')} </button>
                <Confirmation id="sign-off"
                    buttonName="Delete"
                    title={t('deleteAccount')}
                    accept={t('confirmAccountDelete')}
                    deny={t('discard')}
                    onAgree={() => {
                        handleUserConfirmation(true)
                        console.log("Deleteeee", userData)
                        setConfirmDelete(false)}}
                    onDeny={() => 
                        setConfirmDelete(false)}
                    openModal={confirmDelete}
                    setOpenModal={setConfirmDelete}
                />
            </div>
        </div>
    );
};

export default Settings;
