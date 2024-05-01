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
                <h1>{t('settings')}</h1>
                { userData && <div className="settings-data-container">
                    <div className="settings-row">
                        <div className="label">{t('firstName')}:</div>
                        <div className="value">{userData.firstName}</div>
                    </div>
                    <div className="settings-row">
                        <div className="label">{t('lastName')}:</div>
                        <div className="value">{userData.lastName}</div>
                    </div>
                    <div className="settings-row">
                        <div className="label">{t('email')}:</div>
                        <div className="value">{userData.email}</div>
                    </div>
                    <div className="settings-row">
                        <div className="label">{t('phoneNumber')}:</div>
                        <div className="value">{userData.phoneNumber}</div>
                    </div>
                    <div className="settings-row">
                        <div className="label">{t('peselVerified')}:</div>
                        <div className="value">{userData.isPeselVerified ? t('yes') : t('no') }</div>
                    </div>
                    <div className="settings-row">
                        <div className="label">{t('agreementSigned')}:</div>
                        <div className="value">{userData.isAgreementSigned ? t('yes') : t('no') }</div>
                    </div>
                    <div className="settings-row">
                        <div className="label">{t('isAdult')}:</div>
                        <div className="value">{userData.isAdult ? t('yes') : t('no') }</div>
                    </div>
                    <div className="settings-row">
                        <div className="label">{t('organisationName')}:</div>
                        <div className="value">{userData.organisationName ? userData.organisationName : t('none')}</div>
                    </div>
                </div>}
                <button className="settings_edit_button"> {t('edit')} </button>
                <button className="settings_delete_button"> {t('deactivateAccount')} </button>
            </div>
        </div>
    )
};

export default Settings;