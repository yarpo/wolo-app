import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import '../../../styles/admin-home-page.scss';

const AdminCategoriesPage = () => {
    const { t, i18n } = useTranslation();
    const [categories, setCategories] = useState([]);
    const [editedCategoryId, setEditedCategoryId] = useState(null);
    const [editedCategoryData, setEditedCategoryData] = useState({});
    const [formData, setFormData] = useState({});

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


            console.log('Response:', response);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEditClick = (categoryId) => {
        setEditedCategoryId(categoryId);
        const editedCategory = categories.find((category) => category.id === categoryId);
        setEditedCategoryData(editedCategory);
    };

    const handleDeleteClick = async (categoryId) => {
        try {
            await fetch(`http://localhost:8080/categories/delete/${categoryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setCategories(categories.filter((category) => category.id !== categoryId));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
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
                <div id="admin_home_page_events_to_approve">
                    <div id="admin_home_page_events_container">
                        <div>
                            <h1>Categories List</h1>

                            <table className="category-table">
                                <thead>
                                <tr>
                                    {categories.length > 0 &&
                                        Object.keys(categories[0]).map((key) => <th key={key}>{key}</th>)}
                                    <th>Actions</th>
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
                                                    <button onClick={handleSaveClick}>Save</button>
                                                    <></>
                                                    <button onClick={handleCancelClick}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEditClick(category.id)}>Edit</button>
                                                    <></>
                                                    <button onClick={() => handleDeleteClick(category.id)}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <form onSubmit={handleSubmit}>
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
                                        return null;
                                    })}
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCategoriesPage;
