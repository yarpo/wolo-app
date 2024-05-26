"use client";


import { Label, Modal, TextInput  } from "flowbite-react";
import { useState } from "react";

function EditCategory({ onAccept, onClose, categoryData }) {
    const [openModal, setOpenModal] = useState(true);
    const [name, setName] = useState(categoryData.name);

    const handleClose = () => {
        setOpenModal(false);
        onClose();
    }

    const handleAgree = () => {

        onAccept({id: categoryData.id,name});
        setOpenModal(false);
    };

    return (
        <>
        <Modal show={openModal} size="md" popup onClose={handleClose} initialFocus="name">
            <Modal.Header />
            <Modal.Body>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Category</h3>
                <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                </div>
                <TextInput id="name" value={name} onChange={e => setName(e.target.value.trim())} required/>
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

export default EditCategory;