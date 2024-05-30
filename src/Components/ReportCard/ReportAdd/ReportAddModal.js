"use client";

import { Label, Modal, Textarea, Checkbox  } from "flowbite-react";
import { useTranslation } from 'react-i18next';
import { useRef, useState } from "react";

function ReportAdd({ onAccept, onClose }) {
    const { t } = useTranslation();
    const [openModal, setOpenModal] = useState(true);

    const reportInputRef = useRef(null);
    const publishInputRef = useRef(null);

    const handleClose = () => {
        setOpenModal(false);
        onClose();
    }

    const handleAgree = () => {
        const report = reportInputRef.current?.value;
        const published = publishInputRef.current?.checked;

        onAccept({report, published});
        setOpenModal(false);
    };

    return (
        <>
        <Modal show={openModal} size="md" popup onClose={handleClose} initialFocus={reportInputRef}>
            <Modal.Header />
            <Modal.Body>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{t('addReport')}</h3>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="report" value={t('report')} />
                    </div>
                    <Textarea id="report" ref={reportInputRef} required />
                </div>
                <br />
                <div className="flex items-center gap-2">
                    <Checkbox id="publish" ref={publishInputRef}/>
                    <Label htmlFor="publish">{t('publishReport')}</Label>
                </div>
                <br />
                <div className="w-full">
                    <button className="confirm_button" onClick={handleAgree}>{t('add')}</button>
                    <button className="cancel_button" onClick={handleClose}>{t('discard')}</button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default ReportAdd;