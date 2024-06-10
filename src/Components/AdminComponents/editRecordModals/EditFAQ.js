"use client";

import { Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

function EditFAQ({ onAccept, onClose, questionData }) {
	const [openModal, setOpenModal] = useState(true);
	const [questionPL, setQuestionPL] = useState(questionData.questionPL);
	const [questionEN, setQuestionEN] = useState(questionData.questionEN);
	const [questionRU, setQuestionRU] = useState(questionData.questionRU);
	const [questionUA, setQuestionUA] = useState(questionData.questionUA);

	const [answerPL, setAnswerPL] = useState(questionData.answerPL);
	const [answerEN, setAnswerEN] = useState(questionData.answerEN);
	const [answerRU, setAnswerRU] = useState(questionData.answerRU);
	const [answerUA, setAnswerUA] = useState(questionData.answerUA);

	const handleClose = () => {
		setOpenModal(false);
		onClose();
	};

	const handleAgree = () => {
		onAccept({
			id: questionData.id,
			questionPL,
			questionEN,
			questionRU,
			questionUA,
			answerPL,
			answerEN,
			answerRU,
			answerUA,
		});
		setOpenModal(false);
	};

	return (
		<>
			<Modal
				show={openModal}
				size="md"
				popup
				onClose={handleClose}
				initialFocus="name"
			>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Edit FAQ
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="questionEN" value="Question EN" />
							</div>
							<TextInput
								id="questionEN"
								value={questionEN}
								onChange={(e) => setQuestionEN(e.target.value.trim())}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="questionPL" value="Question PL" />
							</div>
							<TextInput
								id="questionPL"
								value={questionPL}
								onChange={(e) => setQuestionPL(e.target.value.trim())}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="questionRU" value="Question RU" />
							</div>
							<TextInput
								id="questionRU"
								value={questionRU}
								onChange={(e) => setQuestionRU(e.target.value.trim())}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="questionUA" value="Question UA" />
							</div>
							<TextInput
								id="questionUA"
								value={questionUA}
								onChange={(e) => setQuestionUA(e.target.value.trim())}
							/>
						</div>

						<div>
							<div className="mb-2 block">
								<Label htmlFor="answerEN" value="Answer EN" />
							</div>
							<TextInput
								id="answerEN"
								value={answerEN}
								onChange={(e) => setAnswerEN(e.target.value.trim())}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="answerPL" value="Answer PL" />
							</div>
							<TextInput
								id="answerPL"
								value={answerPL}
								onChange={(e) => setAnswerPL(e.target.value.trim())}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="answerRU" value="Answer RU" />
							</div>
							<TextInput
								id="answerRU"
								value={answerRU}
								onChange={(e) => setAnswerRU(e.target.value.trim())}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="answerUA" value="Answer UA" />
							</div>
							<TextInput
								id="answerUA"
								value={answerUA}
								onChange={(e) => setAnswerUA(e.target.value.trim())}
							/>
						</div>

						<div className="w-full">
							<button className="confirm_button" onClick={handleAgree}>
								Save
							</button>
							<button className="cancel_button" onClick={handleClose}>
								Cancel
							</button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default EditFAQ;
