import React from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import {VscArrowLeft} from 'react-icons/vsc';
import '../../styles/terms-of-service.scss';

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <div className="terms-content">
        <Link to="/signup" id="back">
            <VscArrowLeft id="back_arrow" /> {t('back')}
        </Link>
        <h1>{t('termsOfService')}</h1>
        <ol className="terms-list">
            <li>{t('termsOfServiceContent.acceptanceOfTerms')}</li>
            <li>{t('termsOfServiceContent.useOfService')}</li>
            <li>{t('termsOfServiceContent.accountRegistration')}</li>
            <li>{t('termsOfServiceContent.userContent')}</li>
            <li>{t('termsOfServiceContent.prohibitedConduct.intro')}
                <ul>
                    <li>- {t('termsOfServiceContent.prohibitedConduct.item1')}</li>
                    <li>- {t('termsOfServiceContent.prohibitedConduct.item2')}</li>
                    <li>- {t('termsOfServiceContent.prohibitedConduct.item3')}</li>
                </ul>
            </li>
            <li>{t('termsOfServiceContent.termination')}</li>
            <li>{t('termsOfServiceContent.intellectualProperty')}</li>
            <li>{t('termsOfServiceContent.disclaimerOfWarranties')}</li>
            <li>{t('termsOfServiceContent.limitationOfLiability')}</li>
            <li>{t('termsOfServiceContent.changesToTerms')}</li>
        </ol>
    </div>
  );
}

export default TermsOfService;