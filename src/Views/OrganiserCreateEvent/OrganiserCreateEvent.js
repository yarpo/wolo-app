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
  categories: Yup.array()
    .min(1, 'At least one category is required')
    .required('Category is required'),
  cityId: Yup.number()
    .required('City is required')
    .min(1, 'City is required'),
  shifts: Yup.array().of(
    Yup.object().shape({
      startTime: Yup.string()
        .required('Start time is required'),
      endTime: Yup.string()
        .required('End time is required')
        .test('is-greater', 'End time must be later than start time', function (value) {
          const { startTime } = this.parent;
          return startTime && value > startTime;
        }),
      capacity: Yup.number()
        .min(1, 'Capacity must be at least 1')
        .required('Capacity is required'),
      requiredMinAge: Yup.number()
        .min(0, 'Required minimum age cannot be negative')
        .required('Required minimum age is required'),
      shiftDirections: Yup.string()
        .required('Shift directions are required'),
      street: Yup.string()
        .required('Street is required'),
      homeNum: Yup.string()
        .required('Home number is required'),
      districtId: Yup.number()
        .required('District is required')
        .min(1, 'District is required'),
    })
  ),
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
      districtId: '',
    }],
    cityId: '',
    peselVerificationRequired: false,
    agreementNeeded: false
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

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
            {({ isSubmitting, values, errors, touched, setFieldValue }) => (
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
                        <Field
                          type="checkbox"
                          name="categories"
                          value={category.id.toString()}
                          as={Checkbox}
                          id={`category-${category.id}`}
                        />
                        <Label htmlFor={`category-${category.id}`} className="ml-2">
                          {category.name}
                        </Label>
                      </div>
                    ))}
                    <ErrorMessage name="categories" component="div" className="text-red-500" />
                  </div>

                  <div className="organiser-create-event-two-columns-item">
                    <Label htmlFor="cityId" value="City" />
                    <Field as={Select} id="cityId" name="cityId" value={values.cityId || ''} onChange={(e) => {
                      handleCityChange(e);
                      setFieldValue("cityId", e.target.value);
                    }} color={errors.cityId && touched.cityId ? 'failure' : undefined}>
                      <option value="">Select city</option>
                      {cities.map(city => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="cityId" component="div" className="text-red-500" />
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
                              <Field as={TextInput} id={`shifts.${index}.startTime`} type="time" name={`shifts.${index}.startTime`} color={errors.shifts && errors.shifts[index] && errors.shifts[index].startTime && touched.shifts && touched.shifts[index] && touched.shifts[index].startTime ? 'failure' : undefined} />
                              <ErrorMessage name={`shifts.${index}.startTime`} component="div" className="text-red-500" />

                              <Label htmlFor={`shifts.${index}.endTime`} value="End Time" />
                              <Field as={TextInput} id={`shifts.${index}.endTime`} type="time" name={`shifts.${index}.endTime`} color={errors.shifts && errors.shifts[index] && errors.shifts[index].endTime && touched.shifts && touched.shifts[index] && touched.shifts[index].endTime ? 'failure' : undefined} />
                              <ErrorMessage name={`shifts.${index}.endTime`} component="div" className="text-red-500" />

                              <Label htmlFor={`shifts.${index}.capacity`} value="Capacity" />
                              <Field as={TextInput} id={`shifts.${index}.capacity`} type="number" min='1' name={`shifts.${index}.capacity`} color={errors.shifts && errors.shifts[index] && errors.shifts[index].capacity && touched.shifts && touched.shifts[index] && touched.shifts[index].capacity ? 'failure' : undefined} />
                              <ErrorMessage name={`shifts.${index}.capacity`} component="div" className="text-red-500" />

                              <Label htmlFor={`shifts.${index}.requiredMinAge`} value="Required Minimum Age" />
                              <Field as={TextInput} id={`shifts.${index}.requiredMinAge`} type="number" min='0' name={`shifts.${index}.requiredMinAge`} color={errors.shifts && errors.shifts[index] && errors.shifts[index].requiredMinAge && touched.shifts && touched.shifts[index] && touched.shifts[index].requiredMinAge ? 'failure' : undefined} />
                              <ErrorMessage name={`shifts.${index}.requiredMinAge`} component="div" className="text-red-500" />

                              <Label htmlFor={`shifts.${index}.shiftDirections`} value="Shift Directions" />
                              <Field as={TextInput} id={`shifts.${index}.shiftDirections`} type="text" name={`shifts.${index}.shiftDirections`} color={errors.shifts && errors.shifts[index] && errors.shifts[index].shiftDirections && touched.shifts && touched.shifts[index] && touched.shifts[index].shiftDirections ? 'failure' : undefined} />
                              <ErrorMessage name={`shifts.${index}.shiftDirections`} component="div" className="text-red-500" />

                              <Label htmlFor={`shifts.${index}.street`} value="Street" />
                              <Field as={TextInput} id={`shifts.${index}.street`} type="text" name={`shifts.${index}.street`} color={errors.shifts && errors.shifts[index] && errors.shifts[index].street && touched.shifts && touched.shifts[index] && touched.shifts[index].street ? 'failure' : undefined} />
                              <ErrorMessage name={`shifts.${index}.street`} component="div" className="text-red-500" />

                              <Label htmlFor={`shifts.${index}.homeNum`} value="Home Number" />
                              <Field as={TextInput} id={`shifts.${index}.homeNum`} type="text" name={`shifts.${index}.homeNum`} color={errors.shifts && errors.shifts[index] && errors.shifts[index].homeNum && touched.shifts && touched.shifts[index] && touched.shifts[index].homeNum ? 'failure' : undefined} />
                              <ErrorMessage name={`shifts.${index}.homeNum`} component="div" className="text-red-500" />

                              <Label htmlFor={`shifts.${index}.districtId`} value="District" />
                              <Field as={Select} id={`shifts.${index}.districtId`} name={`shifts.${index}.districtId`} value={shift.districtId || ''} onChange={(e) => setFieldValue(`shifts.${index}.districtId`, e.target.value)} color={errors.shifts && errors.shifts[index] && errors.shifts[index].districtId && touched.shifts && touched.shifts[index] && touched.shifts[index].districtId ? 'failure' : undefined}>
                                <option value="">Select district</option>
                                {filteredDistricts.map(district => (
                                  <option key={district.id} value={district.id}>{district.name}</option>
                                ))}
                              </Field>
                              <ErrorMessage name={`shifts.${index}.districtId`} component="div" className="text-red-500" />
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