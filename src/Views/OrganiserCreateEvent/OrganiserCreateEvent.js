import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Checkbox, Label,  Textarea, TextInput, Select } from 'flowbite-react';
import { Formik, Field, Form, FieldArray  } from 'formik';
import fetchData from '../../Utils/fetchData.js';
import { URLS, BASE_URL } from '../../config';
import '../../styles/organiser-create-event.scss';
import { Card } from "flowbite-react";


const OrganiserCreateEvent = () => {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetchData(URLS.CATEGORIES, setCategories);
    fetchData(URLS.CITIES, setCities);
    fetchData(URLS.DISTRICTS, setDistricts);
}, []);

  
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
      districtId: ''
    }],
    cityId: '',
    isPeselVerificationRequired: false,
    isAgreementNeeded: false
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    values.categories = Array.from(values.categories);

    console.log(values); 

    const response = await fetch(`${BASE_URL}/events/add?language=${localStorage.getItem('i18nextLng').toLocaleUpperCase}`, {
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
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting, values }) => (
              <Form className="organiser-create-event-event-data">
                <Label htmlFor="name" value="Event Title" />
                <Field as={TextInput} id="name" type="text" sizing="md" name="name" />

                <Label htmlFor="description" value="Description" />
                <Field as={Textarea} id="description" sizing="md" name="description" />

                <Label htmlFor="imageUrl" value="Image URL" />
                <Field as={TextInput} id="imageUrl" type="text" sizing="md" name="imageUrl" />

                <Label htmlFor="date" value="Date" />
                <Field as={TextInput} id="date" type="date" name="date" />

                <div className="organiser-create-event-two-columns">
                  <div className="organiser-create-event-two-columns-item">
                    <Label htmlFor="categoryId" value="Category" />
                      <Field as={Select} id="categories" name="categories">
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                      </Field>
                  </div>

                  <div className="organiser-create-event-two-columns-item">
                    <Label htmlFor="cityId" value="City" />
                    <Field as={Select} id="cityId" name="cityId">
                      {cities.map(city => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                      ))}
                    </Field>
                  </div>
                </div>

                <div className="organiser-create-event-two-columns">
                  <div className="organiser-create-event-two-columns-item">
                    <Label htmlFor="isPeselVerificationRequired" value="Is PESEL Verification Required?" />{" "}
                    <Field as={Checkbox} id="isPeselVerificationRequired" name="isPeselVerificationRequired" />
                  </div>
                  
                  <div className="organiser-create-event-two-columns-item">
                    <Label htmlFor="isAgreementNeeded" value="Is Agreement Needed?" />{" "}
                    <Field as={Checkbox} id="isAgreementNeeded" name="isAgreementNeeded" />
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
                                <Field as={TextInput} id={`shifts.${index}.capacity`} type="number" name={`shifts.${index}.capacity`} />

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
                                  {districts.map(district => (
                                    <option key={district.id} value={district.id}>{district.name}</option>
                                  ))}
                                </Field>
                              </div>
                              <div className="col">
                                <button type="button" onClick={() => remove(index)} className='white_button' >Remove Shift</button>
                              </div>
                            </Card>
                        </div>
                    ))}
                    <button type="button" className='confirm_button' onClick={() => push({ id: null, 
                                                                startTime: '', 
                                                                endTime: '', 
                                                                date: '', 
                                                                capacity: '', 
                                                                isLeaderRequired: false, 
                                                                requiredMinAge: '', 
                                                                shiftDirections: '', 
                                                                street: '', 
                                                                homeNum: '', 
                                                                districtId: '' })}>
                        Add Shift</button>
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