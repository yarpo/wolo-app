"use client";
import { useEffect } from "react";

import { Label, Modal, TextInput, Textarea, Select } from "flowbite-react";
import { useState, useRef } from "react";
import { HiMail, HiPhone, HiHome, HiGlobeAlt } from "react-icons/hi";

import { URLS } from "../../../config";

import fetchData from "../../../Utils/fetchData";
import fetchDataWithAuth from "../../../Utils/fetchDataWithAuth";
import { useTranslation } from "react-i18next";

function EditCategory({ onAccept, onClose, organisationData }) {
	const { t } = useTranslation();
	const [openModal, setOpenModal] = useState(true);
	const [districts, setDistricts] = useState([]);
	const [cities, setCities] = useState([]);
	const [filteredDistricts, setFilteredDistricts] = useState([]);

	const [name, setName] = useState(organisationData.name);
	const [descriptionPL, setDescriptionPL] = useState(
		organisationData.descriptionPL
	);
	const [descriptionEN, setDescriptionEN] = useState(
		organisationData.descriptionEN
	);
	const [descriptionRU, setDescriptionRU] = useState(
		organisationData.descriptionRU
	);
	const [descriptionUA, setDescriptionUA] = useState(
		organisationData.descriptionUA
	);
	const [email, setEmail] = useState(organisationData.email);
	const [phoneNumber, setPhoneNumber] = useState(organisationData.phoneNumber);
	const [street, setStreet] = useState(organisationData.street);
	const [homeNum, setHomeNum] = useState(organisationData.homeNum);
	const [districtId, setDistrictId] = useState(organisationData.districtId);
	const [cityId, setCityId] = useState(organisationData.cityId);
	const [logoUrl, setLogoUrl] = useState(organisationData.logoUrl);
	const [moderatorId, setModeratorId] = useState(null);
	const [currentModeratorId, setCurrentModeratorId] = useState(null);
	const [users, setUsers] = useState([]);
	const [usersAvailable, setUsersAvailable] = useState([]);
	const [allUsers, setAllUsers] = useState([]);
	const userAddedRef = useRef(false);
	
	useEffect(() => {
		const token = localStorage.getItem("token");
		fetchData(URLS.DISTRICTS, setDistricts);
		fetchDataWithAuth(URLS.CITIES, setCities, token);
		fetchDataWithAuth(URLS.USERS, setAllUsers, token);
		fetchDataWithAuth(URLS.USERS_WITH_NO_ROLES, setUsers, token);
	}, []);

	useEffect(() => {
		if (userAddedRef.current === false && allUsers.length > 0 && users.length > 0 && moderatorId != null) {
			const user = allUsers.find(user => user.id === moderatorId);
			setUsersAvailable(users);
			if (user && !users.some(u => u.id === user.id)) {
				setUsersAvailable(prevUsers => [...prevUsers, user]);
				userAddedRef.current = true;
			}
		}
	
	}, [allUsers, organisationData.id, users, moderatorId]);

	useEffect(() => {
		const user = allUsers.find(
			(user) => user.organisationId === organisationData.id
		);
		if (user) {
			setCurrentModeratorId(user.id);
			setModeratorId(user.id);
		}else{
			setUsersAvailable(users);
		}
	}, [allUsers, users, organisationData.id]);

	const handleCityChange = (organisation) => {
		const newSelectedCity = Number(organisation.target.value);
		setCityId(newSelectedCity);
	};

	useEffect(() => {
		const selectedCityObject = cities.find((city) => city.id === cityId);
		if (selectedCityObject) {
			const newFilteredDistricts = districts.filter(
				(district) => district.cityName === selectedCityObject.name
			);
			setFilteredDistricts(newFilteredDistricts);
		} else {
			setFilteredDistricts([]);
		}
	}, [cityId, cities, districts]);


	const handleClose = () => {
		setOpenModal(false);
		onClose();
		userAddedRef.current = false; 
	};
	const handleAgree = () => {
		onAccept({
			id: organisationData.id,
			name,
			descriptionPL,
			descriptionEN,
			descriptionRU,
			descriptionUA,
			email,
			phoneNumber,
			street,
			homeNum,
			districtId,
			moderatorId,
			cityId,
			logoUrl,
			currentModeratorId,
		});
		setOpenModal(false);
	};

	return (
		<>
			<Modal
				show={openModal}
				size="lg"
				popup
				onClose={handleClose}
				initialFocus="firstname"
			>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							{t('editOrganisation')}
						</h3>
						<div>
							<div className="max-w-md">
								<div className="mb-2 block">
									<Label htmlFor="name" value={t('name')} />
								</div>
								<TextInput
									id="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
						</div>
						<div className="max-w-md">
							<div className="mb-2 block">
								<Label htmlFor="descriptionEN" value={t('descriptionEN')} />
							</div>
							<Textarea
								id="descriptionEN"
								value={descriptionEN}
								onChange={(e) => setDescriptionEN(e.target.value)}
								rows={4}
							/>
						</div>
						<div className="max-w-md">
							<div className="mb-2 block">
								<Label htmlFor="descriptionPL" value={t('descriptionPL')}/>
							</div>
							<Textarea
								id="descriptionPL"
								value={descriptionPL}
								onChange={(e) => setDescriptionPL(e.target.value)}
								rows={4}
							/>
						</div>
						<div className="max-w-md">
							<div className="mb-2 block">
								<Label htmlFor="descriptionRU" value={t('descriptionRU')} />
							</div>
							<Textarea
								id="descriptionRU"
								value={descriptionRU}
								onChange={(e) => setDescriptionRU(e.target.value)}
								rows={4}
							/>
						</div>
						<div className="max-w-md">
							<div className="mb-2 block">
								<Label htmlFor="descriptionUA" value={t('descriptionUA')} />
							</div>
							<Textarea
								id="descriptionUA"
								value={descriptionUA}
								onChange={(e) => setDescriptionUA(e.target.value)}
								rows={4}
							/>
						</div>
						<div className="max-w-md">
							<div className="mb-2 block">
								<Label htmlFor="email" value={t('email')} />
							</div>
							<TextInput
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="email"
								icon={HiMail}
							/>
						</div>
						<div className="max-w-md">
							<div className="mb-2 block">
								<Label htmlFor="phone" value={t('phoneNumber')} />
							</div>
							<TextInput
								id="phone"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								type="phone"
								icon={HiPhone}
							/>
						</div>
						<div className="max-w-md">
							<div className="mb-2 block">
								<Label htmlFor="street" value={t('street')} />
							</div>
							<TextInput
								id="street"
								value={street}
								onChange={(e) => setStreet(e.target.value)}
								type="street"
								icon={HiHome}
							/>
						</div>
						<div className="max-w-md">
							<div className="mb-2 block">
								<Label htmlFor="homeNum" value={t("homeNum")} />
							</div>
							<TextInput
								id="homeNum"
								value={homeNum}
								onChange={(e) => setHomeNum(e.target.value)}
								type="homeNum"
								icon={HiHome}
							/>
						</div>
						<div className="max-w-md">
							<div className="mb-2 block">
								<Label htmlFor="city" value={t('city')} />
							</div>
							<Select id="city" value={cityId} onChange={handleCityChange}>
								{cities.map((city) => (
									<option key={city.id} value={city.id}>
										{city.name}
									</option>
								))}
							</Select>
						</div>
						<div className="max-w-md">
							<div className="mb-2 block">
								<Label htmlFor="distrct" value={t('district')} />
							</div>
							<Select
								id="district"
								value={districtId}
								onChange={(e) => setDistrictId(e.target.value)}
							>
								{filteredDistricts.map((district) => (
									<option key={district.id} value={district.id}>
										{district.name}
									</option>
								))}
							</Select>
						</div>
						{/*Organisation moderator*/}
						<div className="max-w-md">
							<div className="mb-2 block">
								<Label htmlFor="moderator" value={t('moderator')} />
							</div>
							<Select
								id="moderator"
								value={moderatorId}
								onChange={(e) => setModeratorId(e.target.value)}
							>
								{usersAvailable.map((user) => (
									<option key={user.id} value={user.id}>
										{user.email}
									</option>
								))}
							</Select>
						</div>
						<div className="max-w-md">
							<div className="mb-2 block">
								<Label htmlFor="url" value={t('logoUrl')} />
							</div>
							<TextInput
								id="url"
								value={logoUrl}
								onChange={(e) => setLogoUrl(e.target.value)}
								type="url"
								icon={HiGlobeAlt}
							/>
						</div>
						<div className="w-full">
							<button className="confirm_button" onClick={handleAgree}>
								{t('save')}
							</button>
							<button className="cancel_button" onClick={handleClose}>
								{t('cancel')}
							</button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default EditCategory;
