"use client";

import React, { useState, useEffect } from 'react';
import '../../styles/faq.scss';
import { URLS } from '../../config';
import fetchData from '../../Utils/fetchData';
import { Accordion } from "flowbite-react";

const ForVolunteers = () => {
    const [questions, setQuestions] = useState([]);
    const questionName = `question${localStorage.getItem('i18nextLng').toUpperCase()}`;
    const answerName = `answer${localStorage.getItem('i18nextLng').toUpperCase()}`;

    useEffect(() => {
        fetchData(URLS.FAQ, setQuestions);
    }, []);

    return (
        <div id="container">
            <Accordion className='faq-accordion'>
                {questions.map((entry, index) => (
                    <Accordion.Panel key={index}>
                        <Accordion.Title>{entry[questionName]}</Accordion.Title>
                        <Accordion.Content>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                {entry[answerName]}
                            </p>
                        </Accordion.Content>
                    </Accordion.Panel>
                ))}
            </Accordion>
        </div>
    );
};

export default ForVolunteers;
