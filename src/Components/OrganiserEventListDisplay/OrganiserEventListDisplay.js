import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import '../../styles/organiser-event-list-display.scss';
import formatDate from '../../Utils/formatDate.js';
import { Link } from 'react-router-dom';
import { URLS } from '../../config.js';
import Confirmation from '../Popups/Confirmation.js';

const OrganiserEventListDisplay = ({ event, isArchived }) => {
    const { t } = useTranslation();
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
        console.log("Delete", event.id);
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
                <button className="column" onClick={() => setConfirmDelete(true)}><strong>{t('delete')}</strong></button>
            }
            <Confirmation id="sign-off"
                    buttonName="Delete"
                    title={t('deleteAccount')}
                    accept={t('confirmAccountDelete')}
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