import { useTranslation } from "react-i18next";
import React, { useState, useEffect, useCallback} from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { HiOutlineSearch } from "react-icons/hi";
import { TextInput, Card } from "flowbite-react";
import '../../styles/admin-home-page.scss';

import { URLS } from '../../config';
import fetchData from '../../Utils/fetchData';
import { HiTrash, HiOutlinePlus, HiArrowSmRight, HiArrowSmLeft, HiPencilAlt } from "react-icons/hi";
import ReactPaginate from 'react-paginate';

import { Table } from "flowbite-react";
import Confirmation from "../Popups/Confirmation";
import AddFAQ from "./addRecordModals/AddFAQ";
import deleteRequest from "../../Utils/deleteRequest";
import postRequestWithJson from "../../Utils/postRequestWithJson";
import EditFAQ from "./editRecordModals/EditFAQ";
import putRequest from "../../Utils/putRequest.js";

const FAQTab = () => {

    const { t } = useTranslation();
    const [openIndex, setOpenIndex] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setEditOpenModal] = useState(false);
    const [questionToEdit, setQuestionToEdit] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);
    const [questionTextToDelete, setQuestionTextToDelete] = useState('');
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const questionName = `question${localStorage.getItem('i18nextLng').toUpperCase()}`;
    const answerName = `answer${localStorage.getItem('i18nextLng').toUpperCase()}`;

    const [currentPage, setCurrentPage] = useState(0);
    const questionsPerPage = 10;

    useEffect(() => {
        fetchData(URLS.FAQ, (data) => {
            setQuestions(data);
            setFilteredQuestions(data);
        });
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredQuestions(questions);
        } else {
            setFilteredQuestions(questions.filter(question =>
                question[questionName].toLowerCase().includes(searchQuery.toLowerCase()) ||
                question[answerName].toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }, [searchQuery, questions, questionName, answerName]);

    const handleModalAccept = (data) => {
        setOpenModal(false);

        postRequestWithJson(`${URLS.ADD_FAQ}?language=${localStorage.getItem('i18nextLng').toLocaleUpperCase()}`, 
                                localStorage.getItem('token'), data, t('addFAQSuccess'), t('addFAQFail'));
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setEditOpenModal(false);
    }

    const toggleDetails = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleUserConfirmation = async (confirmation) => {
        setUserConfirmed(confirmation);
    };

    const handleDelete = useCallback(() => {
        deleteRequest(`${URLS.DELETE_FAQ}/${questionToDelete}`, localStorage.getItem('token'), "Deleted", "Fail");
        setQuestionToDelete(null);
        setConfirmDelete(false);
    }, [questionToDelete]);

    useEffect(() => {
        if (userConfirmed !== false) {
            setUserConfirmed(false);
            handleDelete();
        }
    }, [userConfirmed, handleDelete]);

    const handleDeleteRequest = (question) => {
        setConfirmDelete(true);
        setQuestionToDelete(question.id);
        setQuestionTextToDelete(question[questionName]);
    };

    const handleEdit = (data) => {
      putRequest(
        `${URLS.EDIT_FAQ}`,
        localStorage.getItem("token"),
        data,
        "FAQ was changed successfully",
        "Failed to change FAQ"
      );
      setQuestionToEdit(null);
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const offset = currentPage * questionsPerPage;
    const currentQuestions = filteredQuestions.sort((a, b) => a.id - b.id).slice(offset, offset + questionsPerPage);
    const pageCount = Math.ceil(filteredQuestions.length / questionsPerPage);

    return (
        <div className="overflow-x-auto">
            <div className='admin-panel-add-search-group'>
                <div className="admin-panel-search-bar">
                    <TextInput
                        type="text"
                        placeholder={t('searchQuestions')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        icon={HiOutlineSearch}
                    />
                </div>
                <button className="admin-panel-add" onClick={() => setOpenModal(true)}><HiOutlinePlus /></button>
            </div>
            {openModal && <AddFAQ onAccept={handleModalAccept} onClose={handleModalClose} />}
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>{t('id')}</Table.HeadCell>
                    <Table.HeadCell>{t('question')}</Table.HeadCell>
                    <Table.HeadCell>{t('answer')}</Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {currentQuestions
                        .map((question, index) => (
                        <React.Fragment key={index}>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {question.id}
                                </Table.Cell>
                                <Table.Cell>{question[questionName]}</Table.Cell>
                                <Table.Cell>{question[answerName]}</Table.Cell>
                                <Table.Cell>
                                    <button
                                        className="details-toggle"
                                        onClick={() => toggleDetails(index)}
                                    >
                                        {openIndex === index ? <VscChevronUp /> : <VscChevronDown />}
                                        <span className="dropdown-label"></span>
                                    </button>
                                </Table.Cell>
                                <Table.Cell>
                                  {openEditModal && questionToEdit === question && (
                                    <EditFAQ
                                      onAccept={handleEdit}
                                      onClose={handleModalClose}
                                      questionData={question}
                                    />
                                  )}
                                    <button
                                        className="edit-button"
                                        onClick={() => {
                                                setEditOpenModal(true);
                                               setQuestionToEdit(question);
                                            }
                                        } 
                                   >
                                    <span><HiPencilAlt /></span>
                                    </button>
                                </Table.Cell>
                                <Table.Cell className="table-cell-action">
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeleteRequest(question)}
                                    >
                                        <span><HiTrash /></span>
                                    </button>
                                    <Confirmation
                                        id="sign-off"
                                        buttonName={t('delete')}
                                        title={t('doYouWantToDelete') + ": " + questionTextToDelete + " ?"} 
                                        accept={t('delete')}
                                        deny={t('discard')}
                                        styleId="sign-in"
                                        onAgree={() => {
                                            handleUserConfirmation(true);
                                            setConfirmDelete(false);
                                        }}
                                        onDeny={() => {
                                            setConfirmDelete(false);
                                            setQuestionToDelete(null);
                                        }}
                                        openModal={confirmDelete}
                                        setOpenModal={setConfirmDelete}
                                    />
                                </Table.Cell>
                            </Table.Row>
                            {openIndex === index && (
                                <Table.Cell colSpan="8">
                                    <div className="dropdown-content">
                                        <Card>
                                            <div className="card-content">
                                                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                                                    {question[questionName]}
                                                </h5>
                                                <div className="grid-container">
                                                    <p><strong>{t('question')} - {t('polish')}:</strong> {question.questionPL}</p>
                                                    <p><strong>{t('question')} - {t('english')}:</strong> {question.questionEN}</p>
                                                    <p><strong>{t('question')} - {t('ukrainian')}:</strong> {question.questionUA}</p>
                                                    <p><strong>{t('question')} - {t('russian')}:</strong> {question.questionRU}</p>
                                                </div>
                                                <div className="grid-container">
                                                    <p><strong>{t('answer')} - {t('polish')}:</strong> {question.answerPL}</p>
                                                    <p><strong>{t('answer')} - {t('english')}:</strong> {question.answerEN}</p>
                                                    <p><strong>{t('answer')} - {t('ukrainian')}:</strong> {question.answerUA}</p>
                                                    <p><strong>{t('answer')} - {t('russian')}:</strong> {question.answerRU}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </Table.Cell>
                            )}
                        </React.Fragment>
                    ))}
                </Table.Body>
            </Table>
            <ReactPaginate
                previousLabel={<HiArrowSmLeft />}
                nextLabel={<HiArrowSmRight />}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                pageClassName={'pagination__page'}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination__link'}
                nextLinkClassName={'pagination__link'}
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination__link--active'}
            />
        </div>
    );

};

export default FAQTab;