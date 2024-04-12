import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import '../../../styles/shift-entry.scss';
import { VscChevronRight, VscChevronDown } from "react-icons/vsc";
import VolunteerEntry from './VolunteerEntry';
import formatTime from '../../../Utils/formatTime.js';
import fetchData from '../../../Utils/fetchData.js'; 
import { URLS } from '../../../config.js';


const ShiftEntry = ({ id, startTime, endTime, numVolunteers, maxVolunteers }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [volunteerData, setVolunteerData] = useState(null);

    useEffect(() => {
        const url = `${URLS.USERS_ON_SHIFT}=${id}`;
        fetchData(url, setVolunteerData);
    }, [id]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleToggle();
        }
    };

    return (
        <div className='shift_entry'>
            <button className='shift_entry_toggle' onClick={handleToggle} onKeyDown={handleKeyDown}>
                {isOpen ? (
                    <>
                        <VscChevronDown id="shift_entry_icon"/> 
                    </>
                ) : (
                    <>
                        <VscChevronRight id="shift_entry_icon"/> 
                    </>
                )}
                <span className="shift_entry_shift"><strong>{t('shift')}:</strong> { formatTime(startTime) } - { formatTime(endTime) } </span>
                <span className="shift_entry_volunteer"><strong>{t('volunteers')}:</strong> { numVolunteers } / { maxVolunteers }</span>
            </button>

            {isOpen ? (
                    <>
                        {volunteerData && volunteerData.length > 0 ? (
                            <ol className='shift_entry_list'>
                                {volunteerData.map((volunteer, index) => (
                                    <li key={index}>
                                        <VolunteerEntry 
                                            name={volunteer.firstName}
                                            lastname={volunteer.lastName}
                                            phone={volunteer.phoneNumber}
                                            email={volunteer.email}
                                        />
                                    </li>
                                ))}
                            </ol>
                        ) : (
                            <p className='shift_entry_no_volunteers'>There are no volunteers signed in</p>
                        )}
                    </>
                ) : (
                    <>
                    </>
                )}
        </div>
    )
}

export default ShiftEntry;