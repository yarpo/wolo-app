"use client";
import { Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function AddCategory({ onAccept, onClose }) {
    const { t } = useTranslation();
    const [openModal, setOpenModal] = useState(true);

    const nameInputRef = useRef(null);

    const handleClose = () => {
        setOpenModal(false);
        onClose();
    }

    const handleAgree = () => {
        const name = nameInputRef.current?.value;

        onAccept({name});
        setOpenModal(false);
    };

    return (
        <>
        <Modal show={openModal} size="md" popup onClose={handleClose} initialFocus={nameInputRef}>
            <Modal.Header />
            <Modal.Body>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{t("newCategory")}</h3>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value={t('name')} />
                    </div>
                    <TextInput id="name" ref={nameInputRef} placeholder={t("placeholderCategory")} required />
                </div>
                <div className="w-full">
                    <button className="confirm_button" onClick={handleAgree}>{t("save")}</button>
                    <button className="cancel_button" onClick={handleClose}>{t("cancel")}</button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default AddCategory;