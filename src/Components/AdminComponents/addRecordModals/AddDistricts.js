"use client";

import { useEffect } from 'react';
import { Label, Modal, TextInput, Select  } from "flowbite-react";
import { useRef, useState } from "react";
import { URLS } from "../../../config";
import fetchDataWithAuth from '../../../Utils/fetchDataWithAuth';
import { useTranslation } from "react-i18next";

function AddDistrict({ onAccept, onClose }) {
    const { t } = useTranslation();
    const [openModal, setOpenModal] = useState(true);
    const [cities, setCities] = useState([]);

    const nameInputRef = useRef(null);
    const cityInputRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetchDataWithAuth(URLS.CITIES, setCities, token)
    }, []);

    const handleClose = () => {
        setOpenModal(false);
        onClose();
    }

    const handleAgree = () => {
        const name = nameInputRef.current?.value;
        const cityId = cityInputRef.current?.value;

        onAccept({name, cityId});
        setOpenModal(false);
    };

    return (
        <>
        <Modal show={openModal} size="md" popup onClose={handleClose} initialFocus={nameInputRef}>
            <Modal.Header />
            <Modal.Body>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">{t('newDistrict')}</h3>
                <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value={t('name')} />
                </div>
                <TextInput id="name" ref={nameInputRef} placeholder={t('placeholderDistrict')} required />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="city" value={t('city')} />
                    </div>
                    <Select id="city" ref={cityInputRef} required>
                        {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </Select>
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

export default AddDistrict;