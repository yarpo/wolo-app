
"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

function Confirmation({ buttonName, title, message, accept, deny, onResult, styleId, className }) {
  const [openModal, setOpenModal] = useState(false);
  const handleAgree = () => {
    setOpenModal(false);
    onResult(true);
  };

  const handleDeny = () => {
    setOpenModal(false);
    onResult(false);
  };
  return (
    <>
      <button id={styleId} className={className} onClick={() => setOpenModal(true)}>{buttonName}</button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
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
              <Button color="failure" type="submit" onClick={handleDeny}>
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