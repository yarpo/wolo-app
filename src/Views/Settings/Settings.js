import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

import '../../styles/settings.scss';

import fetchUser from '../../Utils/fetchUser';

const Settings = () => {
    const { t } = useTranslation();
    const [ userData, setUserData ] = useState(null);

    useEffect(() => {
        fetchUser().then(data => {
          if (data) {
            setUserData(data)
          }
        })
      }, []);    

    return (
        <div className="settings-page">
            <div className="settings-container">
                <h1>{t('volunteers')} User Settings</h1>
                { userData && <div className="settings-data-container">
                    <div className="settings-row">
                        <div className="label">First Name:</div>
                        <div className="value">{userData.firstName}</div>
                    </div>
                    <div className="settings-row">
                        <div className="label">Last Name:</div>
                        <div className="value">{userData.lastName}</div>
                    </div>
                    <div className="settings-row">
                        <div className="label">Email:</div>
                        <div className="value">{userData.email}</div>
                    </div>
                    <div className="settings-row">
                        <div className="label">Phone Number:</div>
                        <div className="value">{userData.phoneNumber}</div>
                    </div>
                    <div className="settings-row">
                        <div className="label">PESEL Verified:</div>
                        <div className="value">{userData.isPeselVerified ? "Yes" : "No"}</div>
                    </div>
                    <div className="settings-row">
                        <div className="label">Agreement Signed:</div>
                        <div className="value">{userData.isAgreementSigned ? "Yes" : "No" }</div>
                    </div>
                    <div className="settings-row">
                        <div className="label">Adult:</div>
                        <div className="value">{userData.isAdult ? "Yes" : "No" }</div>
                    </div>
                    <div className="settings-row">
                        <div className="label">Roles:</div>
                        <div className="value">{userData.roles.join(', ')}</div>
                    </div>
                    <div className="settings-row">
                        <div className="label">Organization Name:</div>
                        <div className="value">{userData.organisationName ? userData.organisationName : "None"}</div>
                    </div>
                </div>}
                <button className="settings_edit_button"> Edit </button>
                <button className="settings_delete_button"> Deactivate account </button>
            </div>
        </div>
    )
};

export default Settings;