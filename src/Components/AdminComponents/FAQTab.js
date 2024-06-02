import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { HiOutlineSearch } from "react-icons/hi";
import { TextInput } from "flowbite-react";
import "../../styles/admin-home-page.scss";

import { URLS } from "../../config";
import fetchData from "../../Utils/fetchData";

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
	const [searchQuery, setSearchQuery] = useState("");
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [userConfirmed, setUserConfirmed] = useState(false);
	const [questionToDelete, setQuestionToDelete] = useState(null);
	const [questions, setQuestions] = useState([]);
	const [filteredQuestions, setFilteredQuestions] = useState([]);
	const [openEditModal, setEditOpenModal] = useState(false);
	const [questionToEdit, setQuestionToEdit] = useState(null);

	const questionName = t(
		`question${localStorage.getItem("i18nextLng").toUpperCase()}`
	);
	const answerName = t(
		`answer${localStorage.getItem("i18nextLng").toUpperCase()}`
	);

	useEffect(() => {
		fetchData(URLS.FAQ, (data) => {
			setQuestions(data);
			setFilteredQuestions(data);
		});
	}, []);

	useEffect(() => {
		if (searchQuery === "") {
			setFilteredQuestions(questions);
		} else {
			setFilteredQuestions(
				questions.filter(
					(question) =>
						question[questionName]
							.toLowerCase()
							.includes(searchQuery.toLowerCase()) ||
						question[answerName]
							.toLowerCase()
							.includes(searchQuery.toLowerCase())
				)
			);
		}
	}, [searchQuery, questions]);

	const handleModalAccept = (data) => {
		setOpenModal(false);

		postRequestWithJson(
			`${URLS.ADD_FAQ}?language=${localStorage
				.getItem("i18nextLng")
				.toLocaleUpperCase()}`,
			localStorage.getItem("token"),
			data,
			t("addFAQSuccess"),
			t("addFAQFail")
		);
	};

	const handleModalClose = () => {
		setOpenModal(false);
		setEditOpenModal(false);
	};

	const toggleDetails = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const handleUserConfirmation = async (confirmation) => {
		setUserConfirmed(confirmation);
	};

	useEffect(() => {
		if (userConfirmed !== false) {
			setUserConfirmed(false);
			handleDelete();
		}
	}, [userConfirmed]);

	const handleDelete = () => {
		deleteRequest(
			`${URLS.DELETE_FAQ}/${questionToDelete}`,
			localStorage.getItem("token"),
			"Deleted",
			"Fail"
		);
		setQuestionToDelete(null);
		setConfirmDelete(false);
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

	return (
		<div className="overflow-x-auto">
			<div className="admin-panel-search-bar">
				<TextInput
					type="text"
					placeholder="Search questions"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					icon={HiOutlineSearch}
				/>
			</div>
			<button className="confirm_button" onClick={() => setOpenModal(true)}>
				{" "}
				Add{" "}
			</button>
			{openModal && (
				<AddFAQ onAccept={handleModalAccept} onClose={handleModalClose} />
			)}
			<Table striped>
				<Table.Head>
					<Table.HeadCell>ID</Table.HeadCell>
					<Table.HeadCell>{t("question")}</Table.HeadCell>
					<Table.HeadCell>{t("answer")}</Table.HeadCell>
					<Table.HeadCell>More</Table.HeadCell>
					<Table.HeadCell>Edit</Table.HeadCell>
					<Table.HeadCell>{t("delete")}</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{filteredQuestions.map((question, index) => (
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
										{openIndex === index ? (
											<VscChevronUp />
										) : (
											<VscChevronDown />
										)}
										<span className="dropdown-label">Details</span>
									</button>
								</Table.Cell>
								<Table.Cell>
									{/* edit row */}
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
										}}
									>
										{" "}
										Edit{" "}
									</button>
								</Table.Cell>
								<Table.Cell>
									<button
										className="delete-button"
										onClick={() => {
											setConfirmDelete(true);
											setQuestionToDelete(question.id);
										}}
									>
										<span>Delete</span>
									</button>
									<Confirmation
										id="sign-off"
										buttonName="Delete"
										title="Czy usunąć"
										accept="Tak, usuń"
										deny="Anuluj"
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
								<tr>
									<td colSpan="7">
										<div className="dropdown-content">
											<p>
												<strong>{t("question")} - Polski:</strong>{" "}
												{question.questionPL}
											</p>
											<p>
												<strong>{t("question")} - English:</strong>{" "}
												{question.questionEN}
											</p>
											<p>
												<strong>{t("question")} - Українська:</strong>{" "}
												{question.questionUA}
											</p>
											<p>
												<strong>{t("question")} - Русский:</strong>{" "}
												{question.questionRU}
											</p>
											<p>
												<strong>{t("answer")} - Polski:</strong>{" "}
												{question.answerPL}
											</p>
											<p>
												<strong>{t("answer")} - English:</strong>{" "}
												{question.answerEN}
											</p>
											<p>
												<strong>{t("answer")} - Українська:</strong>{" "}
												{question.answerUA}
											</p>
											<p>
												<strong>{t("answer")} - Русский:</strong>{" "}
												{question.answerRU}
											</p>
										</div>
									</td>
								</tr>
							)}
						</React.Fragment>
					))}
				</Table.Body>
			</Table>
		</div>
	);
};

export default FAQTab;
