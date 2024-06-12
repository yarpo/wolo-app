import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import '../../styles/organiser-event-list-display.scss';
import formatDate from '../../Utils/formatDate.js';
import { Link } from 'react-router-dom';
import { URLS } from '../../config.js';
import Confirmation from '../Popups/Confirmation.js';
import deleteRequest from '../../Utils/deleteRequest.js';
import EditEventByOrganisation from './editModals/EditEventByOrganisation.js';
import putRequest from '../../Utils/putRequest.js';

const OrganiserEventListDisplay = ({ event, isArchived }) => {
    const { t } = useTranslation();
    const eventName = `name${localStorage.getItem('i18nextLng').toUpperCase()}`;
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleUserConfirmation = async (confirmation) => {
        setUserConfirmed(confirmation);

    };

    useEffect(() => {
        if (userConfirmed !== false) {
            setUserConfirmed(false);
            handleDelete()
        }
    }, [userConfirmed]); 

    const handleDelete = () => {
        console.log(`${URLS.DELETE_EVENT}/${event.id}`);
        deleteRequest(`${URLS.DELETE_EVENT}/${event.id}`, localStorage.getItem('token'), "sukces", "Nie sukces")
        setConfirmDelete(false);
    };

    const handleEdit = (data) => {
        setOpenEditModal(false);
        putRequest(
            `${URLS.EDIT_EVENT}/${event.id}`,
            localStorage.getItem("token"),
            data,
            "Event was changed successfully",
            "Failed to change Event's data"
          );

    };

    const handleModalClose = () => {
        setOpenEditModal(false);
    }
    
    return (
        <div className='organiser_event_list_display_content'>
            <div className="column">
                <Link to={`${URLS.DETAILS}/${event.id}`}>
                    {event[eventName]}
                </Link>
            </div>
            <div className="column">
                {formatDate(event.date)}
            </div>
            <div className="column">
                {event.city}
            </div>
            <form className="column">
                <Link to={`/reports?event=${event.id}` }>
                    <div id="organiser_event_list_button">
                        <strong >{t('reports')}</strong>
                    </div>
                </Link>
            </form>
            {openEditModal && (
                                    <EditEventByOrganisation
                                      onAccept={handleEdit}
                                      onClose={handleModalClose}
                                      eventData={event}
                                    />
                                  )}
            {!isArchived && <div className="column">
                <button className="column" id="organiser_event_list_button" onClick={() => setOpenEditModal(true)}><strong>{t('edit')}</strong></button>
            </div>}
            {!isArchived && 
                <button className="column" id="organiser_event_list_delete_button" onClick={() => setConfirmDelete(true)}><strong>{t('delete')}</strong></button>
            }
            <Confirmation id="sign-off"
                    title={t('cancelEvent') + event[eventName] + "?"}
                    accept={t('acceptCancelEvent')}
                    deny={t('discard')}
                    onAgree={() => {
                        handleUserConfirmation(true)
                        setConfirmDelete(false)}}
                    onDeny={() => 
                        setConfirmDelete(false)}
                    openModal={confirmDelete}
                    setOpenModal={setConfirmDelete}
                />
        </div>
    )
};

export default OrganiserEventListDisplay;