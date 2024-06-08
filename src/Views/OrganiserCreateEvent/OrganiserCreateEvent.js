import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Checkbox, Label, Textarea, TextInput, Select, Card } from 'flowbite-react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import fetchData from '../../Utils/fetchData.js';
import { URLS, BASE_URL } from '../../config';
import '../../styles/organiser-create-event.scss';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  description: Yup.string()
    .min(10, 'Description is too short')
    .max(1000, 'Description is too long')
    .required('Description is required'),
  imageUrl: Yup.string()
    .url('Invalid URL format'),
  date: Yup.date()
    .min(new Date(), 'Date cannot be in the past')
    .required('Date is required'),
});

const OrganiserCreateEvent = () => {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchData(URLS.CATEGORIES, setCategories);
    fetchData(URLS.CITIES, setCities);
    fetchData(URLS.DISTRICTS, setDistricts);
  }, []);

  const handleCityChange = (event) => {
    const newSelectedCity = Number(event.target.value);
    setSelectedCity(newSelectedCity);
  };

  useEffect(() => {
    const selectedCityObject = cities.find(city => city.id === selectedCity);
    if (selectedCityObject) {
      const newFilteredDistricts = districts.filter(district => district.cityName === selectedCityObject.name);
      setFilteredDistricts(newFilteredDistricts);
    } else {
      setFilteredDistricts([]);
    }
  }, [selectedCity, cities, districts]);

  const handleCheckChange = (e, categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      if (e.target.checked) {
        setSelectedCategories([...selectedCategories, category]);
      } else {
        setSelectedCategories(
          selectedCategories.filter((c) => c.id !== categoryId)
        );
      }
    }
  };

  const initialValues = {
    name: '',
    organisationId: user.organisationId,
    description: '',
    categories: [],
    imageUrl: '',
    date: '',
    shifts: [{
      startTime: '',
      endTime: '',
      capacity: '',
      isLeaderRequired: false,
      requiredMinAge: '',
      shiftDirections: '',
      street: '',
      homeNum: '',
      districtId: null
    }],
    cityId: selectedCity,
    peselVerificationRequired: false,
    agreementNeeded: false
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    values.categories = selectedCategories.map(category => category.id);

    values.cityId = parseInt(selectedCity);
    for (let i = 0; i < values.shifts.length; i++) {
      values.shifts[i].districtId = parseInt(values.shifts[i].districtId);
    }

    const response = await fetch(`${BASE_URL}/events/add?language=${localStorage.getItem('i18nextLng').toLocaleUpperCase()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(values)
    });

    if (response.ok) {
      toast.success('Event added successfully');
      resetForm();
    } else {
      toast.error('Failed to add event');
    }

    setSubmitting(false);
  };

  return (
    <div id="organiser-create-event-container" className="flex justify-center items-center" style={{ minHeight: 'calc(100vh)' }}>
      <Card>
        <div className="flex flex-col gap-4">
          <h1>{t('createEvent')}</h1>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting, values, errors, touched }) => (
              <Form className="organiser-create-event-event-data">
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Event Title" />
                </div>
                <Field
                  as={TextInput}
                  id="name"
                  type="text"
                  sizing="md"
                  name="name"
                  color={errors.name && touched.name ? 'failure' : undefined}
                />
                <ErrorMessage name="name" component="div" className="text-red-500" />

                <div className="mb-2 block">
                  <Label htmlFor="description" value="Description" />
                </div>
                <Field
                  as={Textarea}
                  id="description"
                  sizing="md"
                  name="description"
                  color={errors.description && touched.description ? 'failure' : undefined}
                />
                <ErrorMessage name="description" component="div" className="text-red-500" />

                <Label htmlFor="imageUrl" value="Image URL" />
                <Field
                  as={TextInput}
                  id="imageUrl"
                  type="text"
                  sizing="md"
                  name="imageUrl"
                  color={errors.imageUrl && touched.imageUrl ? 'failure' : undefined}
                />
                <ErrorMessage name="imageUrl" component="div" className="text-red-500" />

                <Label htmlFor="date" value="Date" />
                <Field
                  as={TextInput}
                  id="date"
                  type="date"
                  name="date"
                  color={errors.date && touched.date ? 'failure' : undefined}
                />
                <ErrorMessage name="date" component="div" className="text-red-500" />

                <div className="organiser-create-event-two-columns">
                  <div className="organiser-create-event-two-columns-item">
                    <Label htmlFor="categories" value="Category" />
                    {categories.map((category, index) => (
                      <div
                        key={category.id}
                        className="flex items-center w-full"
                        style={{
                          backgroundColor: index % 2 === 0 ? "#f8f8f8" : "#f0f0f0",
                          padding: index % 2 === 0 ? 0 : 10,
                          paddingLeft: 10,
                        }}
                      >
                        <Checkbox
                          value={category.id}
                          checked={selectedCategories.some(c => c.id === category.id)}
                          onChange={(e) => handleCheckChange(e, category.id)}
                          label={category.name}
                          id={`category-${category.id}`}
                        />
                        <Label htmlFor={`category-${category.id}`} className="ml-2">
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <div className="organiser-create-event-two-columns-item">
                    <Label htmlFor="cityId" value="City" />
                    <Field as={Select} id="cityId" name="cityId" onChange={handleCityChange} >
                      {cities.map(city => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                      ))}
                    </Field>
                  </div>
                </div>

                <div className="organiser-create-event-two-columns">
                  <div className="organiser-create-event-two-columns-item">
                    <Label htmlFor="peselVerificationRequired" value="Is PESEL Verification Required?" />{" "}
                    <Field as={Checkbox} id="peselVerificationRequired" name="peselVerificationRequired" />
                  </div>

                  <div className="organiser-create-event-two-columns-item">
                    <Label htmlFor="agreementNeeded" value="Is Agreement Needed?" />{" "}
                    <Field as={Checkbox} id="agreementNeeded" name="agreementNeeded" />
                  </div>
                </div>
                <FieldArray name="shifts" className="organiser-create-event-grid">
                  {({ remove, push }) => (
                    <div>
                      {values.shifts.map((shift, index) => (
                        <div className="organiser-create-event-row" key={index}>
                          <Card>
                            <h2>{t('shift')}</h2>
                            <div className="col">
                              <Label htmlFor={`shifts.${index}.startTime`} value="Start Time" />
                              <Field as={TextInput} id={`shifts.${index}.startTime`} type="time" name={`shifts.${index}.startTime`} />

                              <Label htmlFor={`shifts.${index}.endTime`} value="End Time" />
                              <Field as={TextInput} id={`shifts.${index}.endTime`} type="time" name={`shifts.${index}.endTime`} />

                              <Label htmlFor={`shifts.${index}.capacity`} value="Capacity" />
                              <Field as={TextInput} id={`shifts.${index}.capacity`} type="number" min='1' name={`shifts.${index}.capacity`} />

                              <Label htmlFor={`shifts.${index}.isLeaderRequired`} value="Is Leader Required?" />
                              <Field as={Checkbox} id={`shifts.${index}.isLeaderRequired`} name={`shifts.${index}.isLeaderRequired`} /> 
                              <br />

                              <Label htmlFor={`shifts.${index}.requiredMinAge`} value="Required Minimum Age" />
                              <Field as={TextInput} id={`shifts.${index}.requiredMinAge`} type="text" name={`shifts.${index}.requiredMinAge`} />

                              <Label htmlFor={`shifts.${index}.shiftDirections`} value="Shift Directions" />
                              <Field as={TextInput} id={`shifts.${index}.shiftDirections`} type="text" name={`shifts.${index}.shiftDirections`} />

                              <Label htmlFor={`shifts.${index}.street`} value="Street" />
                              <Field as={TextInput} id={`shifts.${index}.street`} type="text" name={`shifts.${index}.street`} />

                              <Label htmlFor={`shifts.${index}.homeNum`} value="Home Number" />
                              <Field as={TextInput} id={`shifts.${index}.homeNum`} type="text" name={`shifts.${index}.homeNum`} />

                              <Label htmlFor={`shifts.${index}.districtId`} value="District" />
                              <Field as={Select} id={`shifts.${index}.districtId`} name={`shifts.${index}.districtId`}>
                                {filteredDistricts.map(district => (
                                  <option key={district.id} value={district.id}>{district.name}</option>
                                ))}
                              </Field>
                            </div>
                            <div className="col">
                              <button type="button" onClick={() => remove(index)} className='white_button'>Remove Shift</button>
                            </div>
                          </Card>
                        </div>
                      ))}
                      <button type="button" className='confirm_button' onClick={() => push({
                        startTime: '', 
                        endTime: '', 
                        capacity: '', 
                        isLeaderRequired: false, 
                        requiredMinAge: '', 
                        shiftDirections: '', 
                        street: '', 
                        homeNum: '', 
                        districtId: '' })}>
                        Add Shift
                      </button>
                    </div>
                  )}
                </FieldArray>
                <div className='organiser-create-event-submit-button-wrapper'>
                  <button type="submit" className='confirm_button' disabled={isSubmitting}>Submit</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Card>
    </div>
  );
}

export default OrganiserCreateEvent;