"use client";
import { useEffect } from 'react';

import { Label, Modal, TextInput, Textarea, Select  } from "flowbite-react";
import { useState } from "react";
import { HiMail, HiPhone, HiHome, HiGlobeAlt } from "react-icons/hi";

import { URLS } from "../../../config";

import fetchData from "../../../Utils/fetchData";
import fetchDataWithAuth from '../../../Utils/fetchDataWithAuth';
function EditCategory({ onAccept, onClose, organisationData }) {
    const [openModal, setOpenModal] = useState(true);
    const [districts, setDistricts] = useState([]);
    const [cities, setCities] = useState([]);
    const [filteredDistricts, setFilteredDistricts] = useState([]);

    const [name, setName] = useState(organisationData.name);
    const [descriptionPL, setDescriptionPL] = useState(organisationData.descriptionPL);
    const [descriptionEN, setDescriptionEN] = useState(organisationData.descriptionEN);
    const [descriptionRU, setDescriptionRU] = useState(organisationData.descriptionRU);
    const [descriptionUA, setDescriptionUA] = useState(organisationData.descriptionUA);
    const [email, setEmail] = useState(organisationData.email);
    const [phoneNumber, setPhoneNumber] = useState(organisationData.phoneNumber);
    const [street, setStreet] = useState(organisationData.street);
    const [homeNum, setHomeNum] = useState(organisationData.homeNum);
    const [districtId, setDistrictId] = useState(organisationData.districtId);
    const [cityId, setCityId] = useState(organisationData.cityId);
    const [logoUrl, setLogoUrl] = useState(organisationData.logoUrl);

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        fetchData(URLS.DISTRICTS, setDistricts);
        fetchDataWithAuth(URLS.CITIES, setCities, token);
        console.log(cityId);
    }, []);


    const handleCityChange = (organisation) => {
        const newSelectedCity = Number(organisation.target.value);
        setCityId(newSelectedCity);
        console.log('ZMIANA', newSelectedCity)
      };

    useEffect(() => {
        const selectedCityObject = cities.find(city => city.id === cityId);
        if (selectedCityObject) {
          const newFilteredDistricts = districts.filter(district => district.cityName === selectedCityObject.name);
          setFilteredDistricts(newFilteredDistricts);
        } else {
          setFilteredDistricts([]);
        }
      }, [cityId, cities, districts]);
      

    const handleClose = () => {
        setOpenModal(false);
        onClose();
    }

    const handleAgree = () => {
        onAccept({name, descriptionPL, descriptionEN,descriptionRU,descriptionUA, email, phoneNumber, street, homeNum, districtId, cityId, logoUrl});
        setOpenModal(false);
    };

    return (
        <>
        <Modal show={openModal} size="lg" popup onClose={handleClose} initialFocus='firstname'>
            <Modal.Header />
            <Modal.Body>
            <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Organisation</h3>
                <div>
                <div className="max-w-md">
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                </div>
                <TextInput id="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="descriptionEN" value="Description EN" />
                    </div> 
                    <Textarea id="descriptionEN" value={descriptionEN} onChange={e => setDescriptionEN(e.target.value)} rows={4} />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="descriptionPL" value="Description PL" />
                    </div> 
                    <Textarea id="descriptionPL" value={descriptionPL} onChange={e => setDescriptionPL(e.target.value)} rows={4} />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="descriptionRU" value="Description RU" />
                    </div> 
                    <Textarea id="descriptionRU" value={descriptionRU} onChange={e => setDescriptionRU(e.target.value)} rows={4} />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="descriptionUA" value="Description UA" />
                    </div> 
                    <Textarea id="descriptionUA" value={descriptionUA} onChange={e => setDescriptionUA(e.target.value)} rows={4} />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput id="email" value={email} onChange={e => setEmail(e.target.value)}  type="email" icon={HiMail}   />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value="Phone number" />
                    </div>
                    <TextInput id="phone" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}  type="phone" icon={HiPhone}  />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="street" value="Street address" />
                    </div>
                    <TextInput id="street" value={street} onChange={e => setStreet(e.target.value)} type="street" icon={HiHome} />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="homeNum" value="Address Number" />
                    </div>
                    <TextInput id="homeNum" value={homeNum} onChange={e => setHomeNum(e.target.value)} type="homeNum" icon={HiHome}/>
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="city" value="City" />
                    </div>
                    <Select id="city"  value={cityId} onChange={handleCityChange}>
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
                    <Select id="district" value={districtId} onChange={e =>  setDistrictId(e.target.value)} >
                        {filteredDistricts.map(district => (
                            <option key={district.id} value={district.id}>{district.name}</option>
                        ))}
                    </Select>
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="url" value="Logo URL" />
                    </div>
                    <TextInput id="url" value={logoUrl}  onChange={e => setLogoUrl(e.target.value)} type="url" icon={HiGlobeAlt } />
                </div>
                <div className="w-full">
                    <button className="confirm_button" onClick={handleAgree}>Save</button>
                    <button className="cancel_button" onClick={handleClose}>Cancel</button>
                </div>
            </div>
            </Modal.Body>
        </Modal>
        </>
    );
}

export default EditCategory;