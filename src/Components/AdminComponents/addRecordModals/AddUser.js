"use client";
import { Label, Modal, TextInput, Checkbox  } from "flowbite-react";
import { useRef, useState } from "react";
import { HiMail, HiPhone } from "react-icons/hi";
import { useTranslation } from "react-i18next";

function AddUser({ onAccept, onClose }) {
    const { t } = useTranslation();
    const [openModal, setOpenModal] = useState(true);
    const [isAdultChecked, setIsAdultChecked] = useState(false);

    const firstNameInputRef = useRef(null);
    const lastNameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const handleClose = () => {
        setOpenModal(false);
        onClose();
    }

    const handleAgree = () => {
        const firstName = firstNameInputRef.current?.value;
        const lastName = lastNameInputRef.current?.value;
        const email = emailInputRef.current?.value;
        const phoneNumber = phoneInputRef.current?.value;
        const password = passwordInputRef.current?.value;
        const isAdult = isAdultChecked;

        onAccept({firstName, lastName, email, phoneNumber, password, isAdult});
        setOpenModal(false);
    };

    return (
        <>
        <Modal show={openModal} size="md" popup onClose={handleClose} initialFocus={firstNameInputRef}>
            <Modal.Header />
            <Modal.Body>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{t('newUser')}</h3>
                <div>
                <div className="mb-2 block">
                    <Label htmlFor="firstname" value={t('firstName')} />
                </div>
                <TextInput id="firstname" ref={firstNameInputRef} placeholder="Jan" required />
                </div>
                <div>
                <div className="mb-2 block">
                    <Label htmlFor="lastname" value={t("lastName")} />
                </div>
                <TextInput id="lastname" ref={lastNameInputRef} placeholder="Kowalski" required />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value={t('email')} />
                    </div>
                    <TextInput id="email" ref={emailInputRef} type="email" icon={HiMail} placeholder="wolo@app.com" required />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value={t('phoneNumber')} />
                    </div>
                    <TextInput id="phone" ref={phoneInputRef} type="phone" icon={HiPhone} placeholder="123 456 789" required />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="password" value={t('password')} />
                    </div>
                    <TextInput id="password" ref={passwordInputRef} type="password" required />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="adult" checked={isAdultChecked} onChange={() => setIsAdultChecked(!isAdultChecked)} />
                    <Label htmlFor="adult" className="flex">
                     {t('isAdult')}
                    </Label>
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

export default AddUser;