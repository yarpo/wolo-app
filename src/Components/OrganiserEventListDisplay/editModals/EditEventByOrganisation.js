"use client";

import {
	Label,
	Modal,
	TextInput,
	Textarea,
	Checkbox,
	Select,
	Datepicker,
} from "flowbite-react";
import { useState, useEffect } from "react";
import { URLS } from "../../../config";
import { HiGlobeAlt } from "react-icons/hi";
import fetchData from "../../../Utils/fetchData";
import EditShiftByOrganisation from "./EditShiftByOrganisation";
import fetchUser from '../../../Utils/fetchUser';
import { useTranslation } from "react-i18next";

function EditEventByOrganisation({ onAccept, onClose, eventData }) {
	const { t } = useTranslation();
	const [organisationId, setOrganisationId] = useState(null);
	const [event, setEvent] = useState([]);
	const [openModal, setOpenModal] = useState(true);

	const [namePL, setNamePL] = useState(eventData.namePL);
	const [nameEN, setNameEN] = useState(eventData.nameEN);
	const [nameRU, setNameRU] = useState(eventData.nameRU);
	const [nameUA, setNameUA] = useState(eventData.nameUA);

	const [descriptionPL, setDescriptionPL] = useState(null);
	const [descriptionEN, setDescriptionEN] = useState(null);
	const [descriptionRU, setDescriptionRU] = useState(null);
	const [descriptionUA, setDescriptionUA] = useState(null);

	const [categories, setCategories] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState(
		eventData.categories
	);

	const [isPeselVerificationRequired, setIsPeselVerificationRequired] = useState(
		eventData.isPeselVerificationRequired
	);
	const [isAgreementNeeded, setIsAgreementNeeded] = useState(
		eventData.isAgreementNeeded
	);

	const [cities, setCities] = useState([]);
	const [cityId, setCityId] = useState(null);

	const [imageUrl, setImageUrl] = useState(eventData.imageUrl);
	const [date, setDate] = useState(
		eventData.date.split("-").reverse().join("/")
	);

	const [districts, setDistricts] = useState([]);
	const [filteredDistricts, setFilteredDistricts] = useState([]);
	const districtMapName = Object.fromEntries(
		districts.map((d) => [d.name, d.id])
	);


	const [fetchedShifts, setFetchedShifts] = useState([]);
	const [shifts, setShifts] = useState([]);
	const [isShiftsSet, setIsShiftsSet] = useState(false);

	useEffect(() => {
		fetchData(URLS.CATEGORIES, setCategories);
		fetchData(URLS.CITIES, setCities);
		fetchUser().then(data => {
			setOrganisationId(data.organisationId);	
		})
		fetchData(`${URLS.EVENTS}/${eventData.id}`, (data) => {
			setEvent(data);
			setFetchedShifts(data.shifts);  
		});
		fetchData(
			URLS.DISTRICTS,
			(data) => {
				setDistricts(data);
			},
		);
	}, [eventData.id]);

	useEffect(() => {
		if (!isShiftsSet && fetchedShifts.length > 0 && districts.length > 0) {
			const formattedShifts = fetchedShifts.map(shift => {
				const districtId = districtMapName[shift.district];
				return {
					...shift,
					id: shift.shiftId,
					districtId: districtId,
					isLeaderRequired: false,
				};
			});
			console.log("formattedShifts", formattedShifts);
			setShifts(formattedShifts);
			setIsShiftsSet(true);
		}
	}, [fetchedShifts, districts, districtMapName, isShiftsSet]);

	
	const modifyShifts = (action, index, field, value) => {
		if (action === "add") {
			setShifts([...shifts, value]);
		} else if (action === "remove") {
			setShifts(shifts.filter((_, i) => i !== index));
		} else if (action === "update") {
			const newShifts = [...shifts];
			newShifts[index] = { ...newShifts[index], [field]: value };
			setShifts(newShifts);
			console.log("newShifts", newShifts);
			console.log("shifts", shifts);
		}
	};
	

	useEffect(() => {
		const newSelectedCategories = categories.filter((category) =>
			eventData.categories.includes(category.name)
		);
		setSelectedCategories(newSelectedCategories);
		if (event) {
			setDescriptionEN(event.descriptionEN);
			setDescriptionPL(event.descriptionPL);
			setDescriptionRU(event.descriptionRU);
			setDescriptionUA(event.descriptionUA);
		}
	}, [categories, eventData.categories, event]);

	useEffect(() => {
		const cityMapName = Object.fromEntries(
			cities.map((city) => [city.name, city.id])
		);
		setCityId(cityMapName[eventData.city]);
	}, [cities, eventData.city]);

	useEffect(() => {
			const cityMap = Object.fromEntries(
				cities.map((city) => [city.id, city.name])
			);
			const cityName = cityMap[cityId];
			const newFilteredDistricts = districts.filter(
				(district) => district.cityName === cityName
			);
			setFilteredDistricts(newFilteredDistricts);
		
	}, [cityId, districts, cities]);

	const handleCheckChange = (e, categoryId) => {
		const category = categories.find((c) => c.id === categoryId);
		if (category) {
			if (e.target.checked) {
				setSelectedCategories([...selectedCategories, category]);
			} else {
				setSelectedCategories(
					selectedCategories.filter((c) => c.id !== categoryId)
				);
			}
		}
	};

	const handleCityChange = (e) => {
		const cityMap = Object.fromEntries(
			cities.map((city) => [city.id, city.name])
		);
		const newCityId = e.target.value;
		for (let i = 0; i < shifts.length; i++) {
			modifyShifts("update", i, "city",cityMap[newCityId]);
		}
	};

	const handleClose = () => {
		setOpenModal(false);
		onClose();
	};

	const handleAgree = () => {
		const selectedCategoryIds = selectedCategories.map(
			(category) => category.id
		);
		onAccept({
			id: eventData.id,
			namePL,
			nameEN,
			nameRU,
			nameUA,
			descriptionPL,
			descriptionEN,
			descriptionRU,
			descriptionUA,
			organisationId,
			categories: selectedCategoryIds,
			isPeselVerificationRequired,
			isAgreementNeeded,
			imageUrl,
			date: date.split("/").reverse().join("-"),
			cityId,
			shifts,
			mailSend: true
		});
		setOpenModal(false);
	};

	return (
		<>
			<Modal
				show={openModal}
				size="2xl"
				popup
				onClose={handleClose}
				initialFocus="name"
			>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							{t("editEvent")}
						</h3>
						{/* names */}

						<div>
							<div className="mb-2 block">
								<Label htmlFor="nameEN" value={t("nameEN")} />
							</div>
							<TextInput
								id="nameEN"
								value={nameEN}
								onChange={(e) => setNameEN(e.target.value)}
							/>
						</div>

						<div>
							<div className="mb-2 block">
								<Label htmlFor="namePL" value={t("namePL")} />
							</div>
							<TextInput
								id="namePL"
								value={namePL}
								onChange={(e) => setNamePL(e.target.value)}
							/>
						</div>

						<div>
							<div className="mb-2 block">
								<Label htmlFor="nameRU" value={t("nameRU")}/>
							</div>
							<TextInput
								id="nameRU"
								value={nameRU}
								onChange={(e) => setNameRU(e.target.value)}
							/>
						</div>

						<div>
							<div className="mb-2 block">
								<Label htmlFor="nameUA" value={t("nameUA")} />
							</div>
							<TextInput
								id="nameUA"
								value={nameUA}
								onChange={(e) => setNameUA(e.target.value)}
							/>
						</div>

						{/* descriptions */}

						<div className="mb-2 block">
							<Label htmlFor="descriptionEN" value={t("descriptionEN")} />
						</div>
						<Textarea
							id="descriptionEN"
							value={descriptionEN}
							onChange={(e) => setDescriptionEN(e.target.value)}
							rows={4}
						/>

						<div className="mb-2 block">
							<Label htmlFor="descriptionPL" value={t("descriptionPL")} />
						</div>
						<Textarea
							id="descriptionPL"
							value={descriptionPL}
							onChange={(e) => setDescriptionPL(e.target.value)}
							rows={4}
						/>

						<div className="mb-2 block">
							<Label htmlFor="descriptionRU" value={t("descriptionRU")} />
						</div>
						<Textarea
							id="descriptionRU"
							value={descriptionRU}
							onChange={(e) => setDescriptionRU(e.target.value)}
							rows={4}
						/>

						<div className="mb-2 block">
							<Label htmlFor="descriptionUA" value={t("descriptionUA")} />
						</div>
						<Textarea
							id="descriptionUA"
							value={descriptionUA}
							onChange={(e) => setDescriptionUA(e.target.value)}
							rows={4}
						/>
						{/*imageURL*/}
						<div>
							<div className="mb-2 block">
								<Label htmlFor="imageUrl" value={t('imageUrl')} />
							</div>
							<TextInput
								id="imageURL"
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value.trim())}
								icon={HiGlobeAlt}
							/>
						</div>
						{/*date*/}
						<div className="mb-2 block">
							<Label htmlFor="date" value={t('date')} />
						</div>
						<Datepicker
							value={date}
							title={t('dateOfEvent')}
							onSelectedDateChanged={(newDate) =>
								setDate(
									newDate.toLocaleDateString("en-GB", {
										month: "2-digit",
										day: "2-digit",
										year: "numeric",
									})
								)
							}
							id="date"
							name="date"
						/>
						{/* city */}
						<div className="max-w-2xl">
							<div className="mb-2 block">
								<Label htmlFor="city" value={t("city")} />
							</div>
							<Select
								id="city"
								value={cityId}
								onChange={(e) => {
									setCityId(e.target.value);
									handleCityChange(e);
								}}
							>
								{cities.map((city) => (
									<option key={city.id} value={city.id}>
										{city.name}
									</option>
								))}
							</Select>
						</div>

						{/* category */}
						<div className="mb-2 block">
							<Label htmlFor="categories" value={t("categories")} />
						</div>

						<div
							className="flex flex-col items-start gap-2 justify-start"
							style={{
								maxHeight: "200px",
								overflowY: "auto",
								border: "1px solid lightgray",
								borderRadius: "10px",
								padding: "10px",
								backgroundColor: "#f8f8f8",
								marginBottom: 20,
							}}
						>
							{categories.map((category, index) => (
								<div
									key={category.id}
									className="flex items-center w-full"
									style={{
										backgroundColor: index % 2 === 0 ? "#f8f8f8" : "#f0f0f0",
										padding: index % 2 === 0 ? 0 : 10,
										paddingLeft: index % 2 === 0 ? 10 : 10,
									}}
								>
									<Checkbox
										key={category.id}
										value={category.id}
										checked={selectedCategories.some(
											(c) => c.id === category.id
										)}
										onChange={(e) => handleCheckChange(e, category.id)}
										label={category.name}
										id={`category-${category.id}`}
									/>
									<Label htmlFor={`category-${category.id}`} className="ml-2">
										{category.name}
									</Label>
								</div>
							))}
						</div>
						{/*verifications */}
						<div className="flex items-center gap-2">
							<Checkbox
								id="peselVerificationRequired"
								checked={isPeselVerificationRequired}
								onChange={() =>

									setIsPeselVerificationRequired(!isPeselVerificationRequired)
								}
								
							/>
							<Label htmlFor="peselVerificationRequired" className="flex">
								{t('peselVerificationNeeded')}
							</Label>
						</div>

						<div className="flex items-center gap-2">
							<Checkbox
								id="isAgreementNeeded"
								checked={isAgreementNeeded}
								onChange={() => setIsAgreementNeeded(!isAgreementNeeded)}
							/>
							<Label htmlFor="agreementNeeded" className="flex">
								{t('volunteerAgreementNeeded')}
							</Label>
						</div>
						{/* shifts */}
						<EditShiftByOrganisation
							shifts={shifts}
							districts={filteredDistricts}
							modifyShifts={modifyShifts}
						/>

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

export default EditEventByOrganisation;
