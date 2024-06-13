"use client";

import { useEffect } from "react";
import { Label, Modal, TextInput, Select } from "flowbite-react";
import { useState } from "react";
import { URLS } from "../../../config";
import fetchDataWithAuth from "../../../Utils/fetchDataWithAuth";
import { useTranslation } from "react-i18next";

function EditDistrict({ onAccept, onClose, districtData }) {
	const { t } = useTranslation();
	const [openModal, setOpenModal] = useState(true);
	const [cities, setCities] = useState([]);
	const [name, setName] = useState(districtData.name);
	const [cityId, setCityId] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		fetchDataWithAuth(URLS.CITIES, setCities, token);
	}, []);

	useEffect(() => {
		const city = cities.find((city) => city.name === districtData.cityName);
		if (city) {
			setCityId(city.id);
		}
	}, [districtData, cities]);

	const handleClose = () => {
		console.log(districtData);
		setOpenModal(false);
		onClose();
	};

	const handleAgree = () => {
		onAccept({ id: districtData.id, name, cityId });
		setOpenModal(false);
	};

	return (
		<>
			<Modal
				show={openModal}
				size="md"
				popup
				onClose={handleClose}
				initialFocus="name"
			>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							{t("editDistrict")}
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="name" value={t('name')}/>
							</div>
							<TextInput
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="max-w-md">
							<div className="mb-2 block">
								<Label htmlFor="city" value={t('city')} />
							</div>
							<Select
								id="city"
								value={cityId}
								onChange={(e) => setCityId(e.target.value)}
							>
								{cities.map((city) => (
									<option key={city.id} value={city.id}>
										{city.name}
									</option>
								))}
							</Select>
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

export default EditDistrict;
