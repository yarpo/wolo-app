"use client";

import { Label, Modal, TextInput  } from "flowbite-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function AddFAQ({ onAccept, onClose }) {
    const { t } = useTranslation();
    const [openModal, setOpenModal] = useState(true);

    const questionInputRef = useRef(null);
    const answerInputRef = useRef(null);

    const handleClose = () => {
        setOpenModal(false);
        onClose();
    }

    const handleAgree = () => {
        const question = questionInputRef.current?.value;
        const answer = answerInputRef.current?.value;

        onAccept({question, answer});
        setOpenModal(false);
    };

    return (
        <>
        <Modal show={openModal} size="md" popup onClose={handleClose} initialFocus={questionInputRef}>
            <Modal.Header />
            <Modal.Body>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{t('newFAQ')}</h3>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="question" value={t('question')} />
                    </div>
                    <TextInput id="question" ref={questionInputRef} placeholder={t('placeholderQuestion')} required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="answer" value={t('answer')} />
                    </div>
                    <TextInput id="answer" ref={answerInputRef} placeholder={t('placeholderAnswer')} required />
                </div>
                <div className="w-full">
                    <button className="confirm_button" onClick={handleAgree}>{t('save')}</button>
                    <button className="cancel_button" onClick={handleClose}>{t('cancel')}</button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default AddFAQ;