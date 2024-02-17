import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../../styles/admin-categories-page.scss';

const AdminCategoriesPage = () => {
    const { t, i18n } = useTranslation();
    const [categories, setCategories] = useState([]);
    const [editedCategoryId, setEditedCategoryId] = useState(null);
    const [editedCategoryData, setEditedCategoryData] = useState({});
    const [formData, setFormData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        }
    }, [i18n]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/categories/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedResponse = await fetch('http://localhost:8080/categories');
                const updatedData = await updatedResponse.json();
                setCategories(updatedData);
            } else {
                console.error('Error adding category:', await response.text());
            }
        } catch (error) {
            console.error('Error adding category:', error);
        }

        setIsModalOpen(false);
        setFormData({});
    };

    const handleDeleteClick = async (categoryId) => {
        try {
            await fetch(`http://localhost:8080/categories/delete/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setCategories((prevCategories) => prevCategories.filter((category) => category.id !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleModalCloseButton = () => {
        setIsModalOpen(false);
        setFormData({});
    };

    const handleEditClick = (categoryId) => {
        setEditedCategoryId(categoryId);
        const editedCategory = categories.find((category) => category.id === categoryId);
        setEditedCategoryData(editedCategory);
    };



    const handleSaveClick = async () => {
        try {
            const response = await fetch(`http://localhost:8080/categories/${editedCategoryId}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedCategoryData),
            });

            const responseBody = await response.text();
            if (response.ok) {
                const updatedCategories = [...categories];
                const index = updatedCategories.findIndex((category) => category.id === editedCategoryId);
                updatedCategories[index] = editedCategoryData;
                setCategories(updatedCategories);

                setEditedCategoryId(null);
                setEditedCategoryData({});
            } else {
                console.error('Error updating category:', responseBody);
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    const handleCancelClick = () => {
        setEditedCategoryId(null);
        setEditedCategoryData({});
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
            {!isModalOpen && (
                <button onClick={handleAddClick}>{t('Add')}</button>
            )}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="modal-close-button" onClick={handleModalCloseButton}>
                            &times; Close
                        </button>

                        <form onSubmit={handleSubmit} className="modal-form">
                            {categories.length > 0 &&
                                Object.keys(categories[0]).map((key) => {
                                    if (key !== 'id') {
                                        return (
                                            <div key={key}>
                                                <label htmlFor={key}>{t(`tableHeaders.${key}`)}</label>
                                                <input
                                                    type="text"
                                                    id={key}
                                                    name={key}
                                                    onChange={handleChange}
                                                    value={formData[key] || ''}
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

            <table className="table">
                <thead>
                <tr>
                    {categories.length > 0 &&
                        Object.keys(categories[0]).map((key) => <th key={key}>{t(`tableHeaders.${key}`)}</th>)}
                    <th>{t('tableHeaders.actions')}</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        {Object.keys(category).map((key) => (
                            <td key={key}>
                                {key !== 'id' ? (
                                    <>
                                        {editedCategoryId === category.id ? (
                                            <input
                                                type="text"
                                                value={editedCategoryData[key] || ''}
                                                onChange={(e) =>
                                                    setEditedCategoryData({ ...editedCategoryData, [key]: e.target.value })
                                                }
                                            />
                                        ) : (
                                            String(category[key])
                                        )}
                                    </>
                                ) : (
                                    String(category[key])
                                )}
                            </td>
                        ))}
                        <td>
                            {editedCategoryId === category.id ? (
                                <>
                                    <button onClick={handleSaveClick}>{t('userActions.save')}</button>
                                    <button onClick={handleCancelClick}>{t('userActions.cancel')}</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => handleEditClick(category.id)}>{t('userActions.edit')}</button>
                                    <button onClick={() => handleDeleteClick(category.id)}>{t('userActions.delete')}</button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
</div>
</div>
    );
};

export default AdminCategoriesPage;
