"use client";

import { Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function EditFAQ({ onAccept, onClose, questionData }) {
	const { t } = useTranslation();
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
							{t('editFAQ')}
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="questionEN" value={t('questionEN')} />
							</div>
							<TextInput
								id="questionEN"
								value={questionEN}
								onChange={(e) => setQuestionEN(e.target.value.trim())}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="questionPL" value={t('questionPL')}  />
							</div>
							<TextInput
								id="questionPL"
								value={questionPL}
								onChange={(e) => setQuestionPL(e.target.value.trim())}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="questionRU" value={t('questionRU')}  />
							</div>
							<TextInput
								id="questionRU"
								value={questionRU}
								onChange={(e) => setQuestionRU(e.target.value.trim())}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="questionUA" value={t('questionUA')}  />
							</div>
							<TextInput
								id="questionUA"
								value={questionUA}
								onChange={(e) => setQuestionUA(e.target.value.trim())}
							/>
						</div>

						<div>
							<div className="mb-2 block">
								<Label htmlFor="answerEN" value={t('answerEN')}  />
							</div>
							<TextInput
								id="answerEN"
								value={answerEN}
								onChange={(e) => setAnswerEN(e.target.value.trim())}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="answerPL" value={t('answerPL')}  />
							</div>
							<TextInput
								id="answerPL"
								value={answerPL}
								onChange={(e) => setAnswerPL(e.target.value.trim())}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="answerRU" value={t('answerRU')}  />
							</div>
							<TextInput
								id="answerRU"
								value={answerRU}
								onChange={(e) => setAnswerRU(e.target.value.trim())}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="answerUA" value={t('answerUA')} />
							</div>
							<TextInput
								id="answerUA"
								value={answerUA}
								onChange={(e) => setAnswerUA(e.target.value.trim())}
							/>
						</div>

						<div className="w-full">
							<button className="confirm_button" onClick={handleAgree}>
								{t('save')}
							</button>
							<button className="cancel_button" onClick={handleClose}>
								{t('cancel')}
							</button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default EditFAQ;
