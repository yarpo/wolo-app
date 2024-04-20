import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Checkbox, Label,  Textarea, TextInput, Select } from 'flowbite-react';
import { Formik, Field, Form, FieldArray  } from 'formik';
import fetchData from '../../Utils/fetchData.js';
import { URLS, BASE_URL } from '../../config';


const OrganiserCreateEvent = () => {

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
    shifts: [{
      id: null,
      startTime: '',
      endTime: '',
      date: '',
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

    const response = await fetch(`${BASE_URL}/events/add`, {
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
    <div className="flex justify-center items-center min-h-screen pt-20" style={{ minHeight: 'calc(100vh)' }}>
      <div className="flex max-w-md flex-col gap-4">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting, values }) => (
            <Form>
              <Label htmlFor="name" value="Event Title" />
              <Field as={TextInput} id="name" type="text" sizing="md" name="name" />

              <Label htmlFor="description" value="Description" />
              <Field as={Textarea} id="description" sizing="md" name="description" />

              <Label htmlFor="imageUrl" value="Image URL" />
              <Field as={TextInput} id="imageUrl" type="text" sizing="md" name="imageUrl" />

              <Label htmlFor="categories" value="Categories" />
              <Field as="select" id="categories" name="categories" multiple>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </Field>

              <Label htmlFor="cityId" value="City" />
              <Field as={Select} id="cityId" name="cityId">
                {cities.map(city => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </Field>

              <Label htmlFor="isPeselVerificationRequired" value="Is PESEL Verification Required?" />
              <Field as={Checkbox} id="isPeselVerificationRequired" name="isPeselVerificationRequired" />

              <Label htmlFor="isAgreementNeeded" value="Is Agreement Needed?" />
              <Field as={Checkbox} id="isAgreementNeeded" name="isAgreementNeeded" />

              <FieldArray name="shifts">
              {({ remove, push }) => (
                <div>
                    {values.shifts.map((shift, index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <Label htmlFor={`shifts.${index}.startTime`} value="Start Time" />
                          <Field as={TextInput} id={`shifts.${index}.startTime`} type="text" name={`shifts.${index}.startTime`} />

                          <Label htmlFor={`shifts.${index}.endTime`} value="End Time" />
                          <Field as={TextInput} id={`shifts.${index}.endTime`} type="text" name={`shifts.${index}.endTime`} />

                          <Label htmlFor={`shifts.${index}.date`} value="Date" />
                          <Field as={TextInput} id={`shifts.${index}.date`} type="text" name={`shifts.${index}.date`} />

                          <Label htmlFor={`shifts.${index}.capacity`} value="Capacity" />
                          <Field as={TextInput} id={`shifts.${index}.capacity`} type="text" name={`shifts.${index}.capacity`} />

                          <Label htmlFor={`shifts.${index}.isLeaderRequired`} value="Is Leader Required?" />
                          <Field as={Checkbox} id={`shifts.${index}.isLeaderRequired`} name={`shifts.${index}.isLeaderRequired`} />

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
                        <button type="button" onClick={() => remove(index)}>Remove Shift</button>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={() => push({ id: null, startTime: '', endTime: '', date: '', capacity: '', isLeaderRequired: false, requiredMinAge: '', shiftDirections: '', street: '', homeNum: '', districtId: '' })}>Add Shift</button>
                </div>
              )}
            </FieldArray>
            <Button type="submit" variant="primary" disabled={isSubmitting}>Submit</Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default OrganiserCreateEvent;