import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import '../../../styles/admin-home-page.scss';

const AdminEventsPage = () => {
    const { t, i18n } = useTranslation();
    const [events, setEvents] = useState([]);
    const [editedEventId, setEditedEventId] = useState(null);
    const [editedEventData, setEditedEventData] = useState({});

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

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

    const handleCancelClick = () => {
        setEditedEventId(null);
        setEditedEventData({});
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
                            <h1>Events List</h1>

                            <table className="event-table">
                                <thead>
                                <tr>
                                    {events.length > 0 &&
                                        Object.keys(events[0]).map((key) => <th key={key}>{key}</th>)}
                                    <th>Actions</th>
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
                                                            <input
                                                                type="text"
                                                                value={editedEventData[key] || ''}
                                                                onChange={(e) =>
                                                                    setEditedEventData({ ...editedEventData, [key]: e.target.value })
                                                                }
                                                            />

                                                        ) : (
                                                            String(event[key])
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
                                                    <button onClick={handleSaveClick}>Save</button>
                                                    <></>
                                                    <button onClick={handleCancelClick}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEditClick(event.id)}>Edit</button>
                                                    <></>
                                                    <button onClick={() => handleDeleteClick(event.id)}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminEventsPage;
