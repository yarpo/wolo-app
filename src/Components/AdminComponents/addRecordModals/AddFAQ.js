"use client";

import { Label, Modal, TextInput  } from "flowbite-react";
import { useRef, useState } from "react";

function AddFAQ({ onAccept, onClose }) {
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
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create new Q&A</h3>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="question" value="Question" />
                    </div>
                    <TextInput id="question" ref={questionInputRef} placeholder="New question" required />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="answer" value="Answer" />
                    </div>
                    <TextInput id="answer" ref={answerInputRef} placeholder="New answer" required />
                </div>
                <div className="w-full">
                    <button className="confirm_button" onClick={handleAgree}>Accept</button>
                    <button className="cancel_button" onClick={handleClose}>Decline</button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default AddFAQ;