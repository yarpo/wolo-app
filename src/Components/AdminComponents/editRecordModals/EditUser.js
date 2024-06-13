"use client";
import { Label, Modal, TextInput, Checkbox } from "flowbite-react";
import { useState } from "react";
import { HiMail, HiPhone } from "react-icons/hi";
import { useTranslation } from "react-i18next";

function EditCategory({ onAccept, onClose, userData }) {
	const { t } = useTranslation();
	const [openModal, setOpenModal] = useState(true);
	const [isAdultChecked, setIsAdultChecked] = useState(userData.adult);
	const [firstName, setFirstName] = useState(userData.firstName);
	const [lastName, setLastName] = useState(userData.lastName);
	const [email, setEmail] = useState(userData.email);
	const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
	const [peselVerified, setPeselVerified] = useState(userData.peselVerified);
	const [agreementSigned, setAgreementSigned] = useState(
		userData.agreementSigned
	);

	const handleClose = () => {
		setOpenModal(false);
		onClose();
	};

	const handleAgree = () => {
		const adult = isAdultChecked;
		onAccept({
			firstName,
			lastName,
			email,
			phoneNumber,
			peselVerified,
			agreementSigned,
			adult,
		});
		setOpenModal(false);
	};

	return (
		<>
			<Modal
				show={openModal}
				size="md"
				popup
				onClose={handleClose}
				initialFocus="firstname"
			>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							{t('editUser')}
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="firstname" value={t('firstName')} />
							</div>
							<TextInput
								id="firstname"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="lastname" value={t('lastName')} />
							</div>
							<TextInput
								id="lastname"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
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
								icon={HiPhone}
							/>
						</div>
						<div className="flex items-center gap-2">
							<Checkbox
								id="adult"
								checked={isAdultChecked}
								onChange={() => setIsAdultChecked(!isAdultChecked)}
							/>
							<Label htmlFor="adult" className="flex">
								{t('isAdult')}
							</Label>
						</div>
						<div className="flex items-center gap-2">
							<Checkbox
								id="peselVerified"
								checked={peselVerified}
								onChange={() => setPeselVerified(!peselVerified)}
							/>
							<Label htmlFor="peselVerified" className="flex">
								{t('peselVerified')}
							</Label>
						</div>
						<div className="flex items-center gap-2">
							<Checkbox
								id="agreementSigned"
								checked={agreementSigned}
								onChange={() => setAgreementSigned(!agreementSigned)}
							/>
							<Label htmlFor="agreementSigned" className="flex">
								{t('agreementSigned')}
							</Label>
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
