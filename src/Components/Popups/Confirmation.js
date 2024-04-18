'use client';

import { Modal } from 'flowbite-react';
import '../../styles/confirmation-popup.scss';

function Confirmation({ title, message, accept, deny, onAgree, onDeny, openModal, setOpenModal }) {
  const handleAgree = () => {
    setOpenModal(false);
    onAgree();
  };

  const handleDeny = () => {
    setOpenModal(false);
    onDeny();
  };
  
  return (
    <>
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
                <button  className="confirm_button" onClick={handleAgree}>
                {accept}
              </button>
              <button  className="deny_button" onClick={handleDeny}>
                {deny}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default Confirmation;