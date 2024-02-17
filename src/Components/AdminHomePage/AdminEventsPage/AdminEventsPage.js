    import { useTranslation } from 'react-i18next';
    import { useState, useEffect } from 'react';
    import '../../../styles/admin-events-page.scss';

    const AdminEventsPage = () => {
        const { t, i18n } = useTranslation();
        const [events, setEvents] = useState([]);
        const [editedEventId, setEditedEventId] = useState(null);
        const [isModalShiftOpen, setIsModalShiftOpen] = useState(false);
        const [editedEventData, setEditedEventData] = useState({});
        const [categoriesEdit,setCategoriesEdit] = useState(null);
        const [newShiftData, setNewShiftData] = useState({
            startTime: '',
            endTime: '',
            date: '',
            capacity: 0,
            signedUp: 0,
            isLeaderRequired: false,
            requiredMinAge: 0,
        });

        const handleNewShiftChange = (e) => {
            setNewShiftData({
                ...newShiftData,
                [e.target.name]: e.target.value,
            });
        };

        useEffect(() => {
            const storedLanguage = localStorage.getItem('language');
            if (storedLanguage) {
                i18n.changeLanguage(storedLanguage);
            }
        }, [i18n]);
        const handleAddShift = () => {

            const updatedEventData = {
                ...editedEventData,
                shifts: [...editedEventData.shifts, newShiftData],
            };
            setEditedEventData(updatedEventData);
            setNewShiftData({
                startTime: '',
                endTime: '',
                date: '',
                capacity: 0,
                signedUp: 0,
                isLeaderRequired: false,
                requiredMinAge: 0
            });
        };
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:8080/events');
                    const data = await response.json();
                    setEvents(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }, []);

        const handleEditClick = (eventId) => {
            setEditedEventId(eventId);
            const editedEvent = events.find((event) => event.id === eventId);
            setEditedEventData(editedEvent);
        };
        const handleShiftClick= (eventId) =>{
            setIsModalShiftOpen(eventId);
        };
        const handleCategoriesClick=(eventId)=>{
            setCategoriesEdit(eventId);
        };

        const handleDeleteClick = async (eventId) => {
            try {
                await fetch(`http://localhost:8080/events/delete/${eventId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                setEvents(events.filter((event) => event.id !== eventId));
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        };

        const handleSaveClick = async () => {
            try {
                const response = await fetch(`http://localhost:8080/events/${editedEventId}/edit`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedEventData),
                });

                const responseBody = await response.text();
                if (response.ok) {
                    const updatedEvents = [...events];
                    const index = updatedEvents.findIndex((event) => event.id === editedEventId);
                    updatedEvents[index] = editedEventData;
                    setEvents(updatedEvents);

                    setEditedEventId(null);
                    setEditedEventData({});
                } else {
                    console.error('Error updating event:', responseBody);
                }
            } catch (error) {
                console.error('Error updating event:', error);
            }
        };
        const handleToggleValue = (key) => {
            setEditedEventData({ ...editedEventData, [key]: !editedEventData[key] });
        };
        const formatTime = (timeArray) => {
            const [hours, minutes] = timeArray;
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        };
        const formatDate = (dateArray) => {
            const [year, month, day] = dateArray;
            return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        };

        const handleCancelClick = () => {
            setEditedEventId(null);
            setEditedEventData({});
            setIsModalShiftOpen(null);
            setCategoriesEdit(null);
        };

        const handleModalCloseButton = () => {
            setIsModalShiftOpen(false);
            setNewShiftData({
                startTime: '',
                endTime: '',
                date: '',
                capacity: 0,
                signedUp: 0,
                isLeaderRequired: false,
                requiredMinAge: 0
            });
        };

        return (
            <div className='admin_home_page_container'>
                <div id="admin_home_page_background_photo">
                    <div id="admin_home_page_welcome_text">
                        <div>
                            <h1>{t('hello')} user. {t('welcomeToWoloApp')}</h1>
                        </div>
                        <div>
                            <h2>{t('yourAccountStatus')}: administartor</h2>
                        </div>
                    </div>
                </div>
                <div id='admin_home_page_content'>
                    <div id="admin_home_page_events_to_approve">
                        <div id="admin_home_page_events_container">
                            <div>
                                <h1>{t(`Events List`)}</h1>

                                <table className="table">
                                    <thead>
                                    <tr>
                                        {events.length > 0 &&
                                            Object.keys(events[0]).map((key) => <th key={key}>{t(`tableHeaders.${key}`)}</th>)}
                                        <th>{t('tableHeaders.actions')}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {events.map((event) => (
                                        <tr key={event.id}>
                                            {Object.keys(event).map((key) => (
                                                <td key={key}>
                                                    {key !== 'id' ? (
                                                        <>
                                                            {editedEventId === event.id ? (
                                                                typeof event[key] === 'boolean' ? (
                                                                    <button onClick={() => handleToggleValue(key)}>
                                                                        {editedEventData[key] ? t('True') : t('False')}
                                                                    </button>
                                                                ) : key==='categories'?(
                                                                    <ul>
                                                                        {String(event.categories.length)}
                                                                        <button onClick={() => handleCategoriesClick(key)}>
                                                                            {t('Edit Categories')}
                                                                        </button>
                                                                    </ul>
                                                                ) : key === 'shifts' ? (
                                                                    <>
                                                                        {isModalShiftOpen && (
                                                                            <div className="modal-overlay">
                                                                                <div className="modal">
                                                                                    <button className="modal-close-button" onClick={handleModalCloseButton}>
                                                                                        &times; {'Close'}
                                                                                    </button>
                                                                                    <ul>
                                                                                        {editedEventData.shifts.map((shift, index) => (
                                                                                            <li key={index}>
                                                                                                {Object.entries(shift).map(([shiftKey, value]) => (
                                                                                                    <div key={shiftKey}>
                                                                                                        <strong>{t(`${shiftKey}`)}:</strong> {typeof value === 'boolean' ? (t(`${value ? 'true' : 'false'}`)) :
                                                                                                        shiftKey === 'date' ? (formatDate(value)) : shiftKey === 'startTime' ? (formatTime(value)) :
                                                                                                            shiftKey === 'endTime' ? (formatTime(value)) : value}
                                                                                                    </div>
                                                                                                ))}
                                                                                            </li>
                                                                                        ))}
                                                                                    </ul>
                                                                                    <strong>{t('Add new shift')}</strong>
                                                                                    <form onSubmit={handleAddShift} className="modal-form">
                                                                                        {editedEventData.shifts.length > 0 &&
                                                                                            Object.keys(editedEventData.shifts[0]).map((key) => {
                                                                                                if (key !== 'id') {
                                                                                                    return (
                                                                                                        <div key={key}>
                                                                                                            <label htmlFor={key}>{t(`tableHeaders.${key}`)}</label>
                                                                                                            <input
                                                                                                                type="text"
                                                                                                                id={key}
                                                                                                                name={key}
                                                                                                                onChange={handleNewShiftChange}
                                                                                                                value={newShiftData[key] || ''}
                                                                                                            />
                                                                                                        </div>
                                                                                                    );
                                                                                                }
                                                                                            })}
                                                                                        <button type="submit">{t('Add')}</button>
                                                                                    </form>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        {!isModalShiftOpen && (
                                                                            <ul>
                                                                                {String(event.shifts.length)}
                                                                                <button onClick={() => handleShiftClick(key)}>
                                                                                    {t('Edit Shifts')}
                                                                                </button>
                                                                            </ul>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <input
                                                                        type="text"
                                                                        value={editedEventData[key] || ''}
                                                                        onChange={(e) =>
                                                                            setEditedEventData({
                                                                                ...editedEventData,
                                                                                [key]: e.target.value,
                                                                            })
                                                                        }
                                                                    />
                                                                )

                                                            ) : (key === 'categories' ? (
                                                                    <ul>
                                                                        {event[key].map((category) => (
                                                                            <li key={category.id}>{category.name}</li>
                                                                        ))}
                                                                    </ul>
                                                                ) : key === 'shifts' ? (
                                                                    <ul>
                                                                        {event[key].map((shift) => (
                                                                            <li key={shift.id}>
                                                                                {Object.entries(shift).map(([key, value]) => (
                                                                                    <div key={key}>
                                                                                        <strong>{t(`${key}`)}:</strong> {typeof value === 'boolean' ? (t(`${event[key] ? 'true' : 'false'}`) ) :
                                                                                        key === 'date' ? (formatDate(value)) : key === 'startTime' ? (formatTime(value)) :
                                                                                            key === 'endTime' ? (formatTime(value)) : value
                                                                                    }
                                                                                    </div>
                                                                                ))}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                ): (
                                                                    String(event[key])
                                                                )
                                                            )}
                                                        </>
                                                    ) : (
                                                        String(event[key])
                                                    )}
                                                </td>
                                            ))}
                                            <td>
                                                {editedEventId === event.id ? (
                                                    <>
                                                        <button onClick={handleSaveClick}>{t('userActions.save')}</button>
                                                        <></>
                                                        <button onClick={handleCancelClick}>{t('userActions.cancel')}</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button onClick={() => handleEditClick(event.id)}>{t('userActions.edit')}</button>
                                                        <></>
                                                        <button onClick={() => handleDeleteClick(event.id)}>{t('userActions.delete')}</button>
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            {categoriesEdit &&(
                                <>
                                    <ul>
                                        {editedEventData.categories.map((category) => (
                                            <li key={category.id}>{category.name}</li>
                                        ))}
                                    </ul>
                                </>
                            )

                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default AdminEventsPage;
