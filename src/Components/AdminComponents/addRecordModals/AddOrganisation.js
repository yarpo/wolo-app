"use client";
import { useEffect } from 'react';

import { Label, Modal, TextInput, Textarea, Select  } from "flowbite-react";
import { useRef, useState } from "react";
import { HiMail, HiPhone, HiHome, HiGlobeAlt } from "react-icons/hi";

import { URLS } from "../../../config";

import fetchData from "../../../Utils/fetchData";
import fetchDataWithAuth from '../../../Utils/fetchDataWithAuth';

function AddOrganisation({onAccept}) {
    const [openModal, setOpenModal] = useState(true);
    const [districts, setDistricts] = useState([]);
    const [cities, setCities] = useState([]);
    const [users, setUsers] = useState([]);

    const nameInputRef = useRef(null);
    const descriptionInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    const streetInputRef = useRef(null);
    const homeNumInputRef = useRef(null);
    const districtInputRef = useRef(null);
    const cityInputRef = useRef(null);
    const moderatorInputRef = useRef(null);
    const urlInputRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        fetchData(URLS.DISTRICTS, setDistricts);
        fetchDataWithAuth(URLS.CITIES, setCities, token)
        fetchDataWithAuth(URLS.USERS, setUsers, token)
    }, []);

    const handleAgree = () => {
        const name = nameInputRef.current?.value;
        const description = descriptionInputRef.current?.value;
        const email = emailInputRef.current?.value;
        const phoneNumber = phoneInputRef.current?.value;
        const street = streetInputRef.current?.value;
        const homeNum = homeNumInputRef.current?.value;
        const districtId = districtInputRef.current?.value;
        const cityId = cityInputRef.current?.value;
        const moderatorId = moderatorInputRef.current?.value;
        const logoUrl = urlInputRef.current?.value;

        onAccept({name, description, email, phoneNumber, street, homeNum, districtId, cityId, moderatorId, logoUrl});
        setOpenModal(false);
    };

    return (
        <>
        <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={nameInputRef}>
            <Modal.Header />
            <Modal.Body>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create new organisation</h3>
                <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                </div>
                <TextInput id="name" ref={nameInputRef} placeholder="Fundacja WoloApp" required />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="description" value="Organisation's description" />
                    </div>
                    <Textarea id="description" ref={descriptionInputRef} placeholder="To jest fundacja wspierająca wolontariuszy." required rows={4} />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput id="email" ref={emailInputRef} type="email" icon={HiMail} placeholder="wolo@app.com" required />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value="Phone number (optional)" />
                    </div>
                    <TextInput id="phone" ref={phoneInputRef} type="phone" icon={HiPhone} placeholder="123 456 789" required />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="street" value="Street address" />
                    </div>
                    <TextInput id="street" ref={streetInputRef} type="street" icon={HiHome} placeholder="WoloApp Street" required />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="homeNum" value="Address Number" />
                    </div>
                    <TextInput id="homeNum" ref={homeNumInputRef} type="homeNum" icon={HiHome} placeholder="123" required />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="city" value="City" />
                    </div>
                    <Select id="city" ref={cityInputRef} required>
                        {cities.map((city) => (
                            <option key={city.id} value={city.id}>
                                {city.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="distrct" value="District" />
                    </div>
                    <Select id="district" ref={districtInputRef} required>
                        {districts.map((district) => (
                            <option key={district.id} value={district.id}>
                                {district.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="moderator" value="Moderator" />
                    </div>
                    <Select id="moderator" ref={moderatorInputRef} required>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.email}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="url" value="Logo URL (optional)" />
                    </div>
                    <TextInput id="url" ref={urlInputRef} type="url" icon={HiGlobeAlt } placeholder="woloapp.com/logo.png" required />
                </div>
                <div className="w-full">
                <button className="confirm_button" onClick={handleAgree}>Accept</button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default AddOrganisation;