
"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function Confirmation({ buttonName,title, message, accept, deny, onResult }) {
  const [openModal, setOpenModal] = useState(false);
  const handleAgree = () => {
    setOpenModal(false);
    onResult(true);
    window.location.reload();
  };

  const handleDeny = () => {
    setOpenModal(false);
    onResult(false);
    window.location.reload();
  };
  return (
    <>
      <button onClick={() => setOpenModal(true)}>{buttonName}</button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {message}
            </p>
            <div className="flex justify-center gap-4">
                <Button color="success"  type="submit" onClick={handleAgree}>
                {accept}
              </Button>
              <Button color="gray" type="submit" onClick={handleDeny}>
                {deny}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Confirmation;