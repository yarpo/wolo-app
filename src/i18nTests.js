import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n.use(initReactI18next).use(LanguageDetector).use(Backend).init({
    debug: true,
    fallbackLng: 'en',
    lng: 'en',
    resources: {
        en: {
            translation: require('../public/locales/en/translation.json'),
        },
        pl: {
            translation: require('../public/locales/pl/translation.json'),
        },
        ru: {
            translation: require('../public/locales/ru/translation.json'),
        },
        ua: {
            translation: require('../public/locales/ua/translation.json'),
        },
    },
});

export default i18n;