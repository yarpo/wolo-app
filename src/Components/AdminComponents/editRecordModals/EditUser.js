"use client";
import { Label, Modal, TextInput, Checkbox } from "flowbite-react";
import { useState } from "react";
import { HiMail, HiPhone } from "react-icons/hi";

function EditCategory({ onAccept, onClose, userData }) {
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
							Edit User{" "}
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="firstname" value="First name" />
							</div>
							<TextInput
								id="firstname"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="lastname" value="Last name" />
							</div>
							<TextInput
								id="lastname"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
						<div className="max-w-md">
							<div className="mb-2 block">
								<Label htmlFor="email" value="Email" />
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
								<Label htmlFor="phone" value="Phone number" />
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
								User is an adult
							</Label>
						</div>
						<div className="flex items-center gap-2">
							<Checkbox
								id="peselVerified"
								checked={peselVerified}
								onChange={() => setPeselVerified(!peselVerified)}
							/>
							<Label htmlFor="peselVerified" className="flex">
								Pesel verified
							</Label>
						</div>
						<div className="flex items-center gap-2">
							<Checkbox
								id="agreementSigned"
								checked={agreementSigned}
								onChange={() => setAgreementSigned(!agreementSigned)}
							/>
							<Label htmlFor="agreementSigned" className="flex">
								Agreement signed
							</Label>
						</div>
						<div className="w-full">
							<button className="confirm_button" onClick={handleAgree}>
								Save
							</button>
							<button className="cancel_button" onClick={handleClose}>
								Cancel
							</button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default EditCategory;
