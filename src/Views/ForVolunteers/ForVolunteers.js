"use client";

import React, { useState, useEffect } from 'react';
import '../../styles/faq.scss';
import { URLS } from '../../config';
import fetchData from '../../Utils/fetchData';
import { Accordion } from "flowbite-react";
import { useTranslation } from 'react-i18next';

const ForVolunteers = () => {
    const { i18n } = useTranslation();
    const [questions, setQuestions] = useState([]);

    const languageCode = localStorage.getItem('i18nextLng') || 'en';
    const questionKey = `question${languageCode.toUpperCase()}`;
    const answerKey = `answer${languageCode.toUpperCase()}`;

    useEffect(() => {
        fetchData(URLS.FAQ, setQuestions);
    }, []);

    useEffect(() => {
        i18n.changeLanguage(languageCode); 
    }, [languageCode, i18n]);

    return (
        <div id="container">
            <Accordion className='faq-accordion'>
                {questions.map((entry, index) => (
                    <Accordion.Panel key={index}>
                        <Accordion.Title>{entry[questionKey]}</Accordion.Title>
                        <Accordion.Content>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                {entry[answerKey]}
                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                ))}
            </Accordion>
        </div>
    );
};

export default ForVolunteers;