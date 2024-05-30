"use client";


import { Label, Modal, TextInput, Textarea  } from "flowbite-react";
import { useState } from "react";

function EditEvent({ onAccept, onClose, eventData }) {
    const [openModal, setOpenModal] = useState(true);
    const [namePL, setNamePL] = useState(eventData.name);
    const [nameEN, setNameEN] = useState(eventData.name);
    const [nameRU, setNameRU] = useState(eventData.name);
    const [nameUA, setNameUA] = useState(eventData.name);

    const [descriptionPL, setDescriptionPL] = useState(eventData.descriptionPL);
    const [descriptionEN, setDescriptionEN] = useState(eventData.descriptionEN);
    const [descriptionRU, setDescriptionRU] = useState(eventData.descriptionRU);
    const [descriptionUA, setDescriptionUA] = useState(eventData.descriptionUA);

    const handleClose = () => {
        setOpenModal(false);
        onClose();
    }

    const handleAgree = () => {
        onAccept({id: eventData.id,
            namePL, nameEN, nameRU, nameUA, 
            descriptionPL, descriptionEN, descriptionRU, descriptionUA
        });
        setOpenModal(false);
    };

    return (
        <>
        <Modal show={openModal} size="2xl" popup onClose={handleClose} initialFocus="name">
            <Modal.Header />
            <Modal.Body>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Event</h3>
                {/* names */} 

                <div> 
                <div className="mb-2 block">
                    <Label htmlFor="nameEN" value="Name EN" />
                </div>
                    <TextInput id="nameEN" value={nameEN} onChange={e => setNameEN(e.target.value.trim())}/>
                </div>

                <div> 
                <div className="mb-2 block">
                    <Label htmlFor="namePL" value="Name PL" />
                </div>
                    <TextInput id="namePL" value={namePL} onChange={e => setNamePL(e.target.value.trim())}/>
                </div>

                <div> 
                <div className="mb-2 block">
                    <Label htmlFor="nameRU" value="Name RU" />
                </div>
                    <TextInput id="nameRU" value={nameRU} onChange={e => setNameRU(e.target.value.trim())}/>
                </div>

                <div> 
                <div className="mb-2 block">
                    <Label htmlFor="nameUA" value="Name UA" />
                </div>
                    <TextInput id="nameUA" value={nameUA} onChange={e => setNameUA(e.target.value.trim())}/>
                </div>

                
                {/* descriptions */}

                    <div className="mb-2 block">
                        <Label htmlFor="descriptionEN" value="Description EN" />
                    </div> 
                    <Textarea id="descriptionEN" value={descriptionEN} onChange={e => setDescriptionEN(e.target.value)} rows={4} />

                    <div className="mb-2 block">
                        <Label htmlFor="descriptionPL" value="Description PL" />
                    </div> 
                    <Textarea id="descriptionPL" value={descriptionPL} onChange={e => setDescriptionPL(e.target.value)} rows={4} />

                    <div className="mb-2 block">
                        <Label htmlFor="descriptionRU" value="Description RU" />
                    </div> 
                    <Textarea id="descriptionRU" value={descriptionRU} onChange={e => setDescriptionRU(e.target.value)} rows={4} />

                    <div className="mb-2 block">
                        <Label htmlFor="descriptionUA" value="Description UA" />
                    </div> 
                    <Textarea id="descriptionUA" value={descriptionUA} onChange={e => setDescriptionUA(e.target.value)} rows={4} />


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

export default EditEvent;