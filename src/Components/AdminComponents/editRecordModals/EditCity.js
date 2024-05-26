"use client";

import { Label, Modal, TextInput, Checkbox  } from "flowbite-react";
import {  useState } from "react";
import { useEffect } from 'react';
import { URLS } from "../../../config";


import fetchData from "../../../Utils/fetchData";

function EditCategory({ onAccept, onClose, cityData }) {
    const [openModal, setOpenModal] = useState(true);
    const [name, setName] = useState(cityData.name);
    const [districts, setDistricts] = useState([]);
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    

    useEffect(() => {
        fetchData(URLS.DISTRICTS, setDistricts);
    }, []);

    useEffect(() => {
        const newFilteredDistricts = districts.filter(district => district.cityName === cityData.name);
        setFilteredDistricts(newFilteredDistricts);
    }, [cityData, districts]);

    const handleCheckChange = (e, districtId) => {
        if (e.target.checked) {
            const district = districts.find(d => d.id === districtId);
            setFilteredDistricts(prevDistricts => [...prevDistricts, district]);
        } else {
            setFilteredDistricts(prevDistricts => prevDistricts.filter(d => d.id !== districtId));
        }
    };

    const handleClose = () => {
        setOpenModal(false);
        onClose();
    }

    const handleAgree = () => {
        // const districtNames = filteredDistricts.map(district => district.name);
        onAccept({id: cityData.id, name, districts: cityData.districts});
        setOpenModal(false);
    };

    return (
        <>
        <Modal show={openModal} size="md" popup onClose={handleClose} initialFocus='firstname'>
            <Modal.Header />
            <Modal.Body>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit City </h3>
                <div>
                <div className="mb-2 block">
                    <Label htmlFor="firstname" value="Name" /> 
                </div>
                <TextInput id="firstname" value={name} onChange={e => setName(e.target.value)}/>
                </div>
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="distrct" value="Districts" />
                    </div>
                    <div className="flex flex-col items-start gap-2 justify-start" style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid lightgray', borderRadius: '10px', padding: '10px', backgroundColor: '#f8f8f8' , marginBottom: 20 }}>
                    {districts.map((district, index) => (
                        <div key={district.id} className="flex items-center w-full" style={{backgroundColor: index % 2 === 0 ? '#f8f8f8' : '#f0f0f0', padding: index % 2 === 0 ? 0 : 10, paddingLeft: index % 2 === 0 ? 10 : 10}}>
                            <Checkbox 
                                key={district.id} 
                                value={district.id} 
                                checked={filteredDistricts.some(filteredDistrict => filteredDistrict.id === district.id)} 
                                onChange={(e) => handleCheckChange(e, district.id)} 
                                label={district.name} 
                                id={`district-${district.id}`}  
                            />
                            <Label htmlFor={`district-${district.id}`} className="ml-2">
                                {district.name}
                            </Label>
                        </div>
                    ))}
                    </div>
                    </div>
                <div className="w-full">
                    <button className="confirm_button" onClick={handleAgree}>Save</button>
                    <button className="cancel_button" onClick={handleClose}>Cancel</button>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default EditCategory;