import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import '../../styles/organiser-event-list-display.scss';
import formatDate from '../../Utils/formatDate.js';
import { Link } from 'react-router-dom';
import { URLS } from '../../config.js';
import Confirmation from '../Popups/Confirmation.js';
import deleteRequest from '../../Utils/deleteRequest.js';

const OrganiserEventListDisplay = ({ event, isArchived }) => {
    const { t } = useTranslation();
    const eventName = event.namePl; 
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [userConfirmed, setUserConfirmed] = useState(false);

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
    
    return (
        <div className='organiser_event_list_display_content'>
            <div className="column">
                <Link to={`${URLS.DETAILS}/${event.id}`}>
                    {event.nameEN}
                </Link>
            </div>
            <div className="column">
                {formatDate(event.date)}
            </div>
            <div className="column">
                {event.city}
            </div>
            {!isArchived && <div className="column">
                <strong>{t('edit')}</strong>
            </div>}
            {!isArchived && 
                <button className="column" id="organiser_event_list_delete_button" onClick={() => setConfirmDelete(true)}><strong>{t('delete')}</strong></button>
            }
            <Confirmation id="sign-off"
                    title={t('cancelEvent') + eventName + "?"}
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