import { Formik, Field, Form, ErrorMessage } from "formik";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import '../../styles/organiser-create-event.scss';
import fetchData from '../../Utils/fetchData.js';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { URLS } from '../../config.js';

const OrganiserCreateEvent = () => {
  
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
      fetchData(URLS.CATEGORIES, setCategories);
      fetchData(URLS.DISTRICTS, setDistricts);
  }, []);

  const [initialValues] = useState({
    name: '',
    description: '',
    imageUrl: '',
    street: '',
    homeNum: '',
    addressDescription: '',
    districtId: '',
    categories: '',
    shift: '',
    peselVerificationRequired: false,
    volunteerAgreement: false,
    language: i18n.language.toUpperCase(),
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Title is required'),
    description: Yup.string()
      .required('Description is required'),
    districtId: Yup.string()
      .required('District is required'),
    categories: Yup.string()
      .required('At least one category is required'),
    street: Yup.string()
      .required('Address street is required'),
    homeNum: Yup.string()
      .required('Address number is required'),
  });

  return (
    <div className="organiser_create_event_div">
      <h1 className="organiser_create_event_title">{t('createEvent')}</h1>
      <p className="organiser_create_event_sub-title_disclaimer">{t('inputsAreRequired')}</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            console.log(values);

            values.organisationId = 1;
            values.categories = [parseInt(values.categories, 10)];
            values.shifts = [
              {
                startTime: [9, 9],
                endTime: [12, 12],
                date: [2024, 11, 11],
                capacity: 7,
                isLeaderRequired: false,
                requiredMinAge: 18,
              },
            ];

            delete values.shift

            const jsonData = JSON.stringify(values);
            console.log(jsonData);

            try {
              const response2 = await fetch('http://127.0.0.1:8080/events/add', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: jsonData,
              });

            if (!response2.ok) {
              toast.error('Error adding event');
              return;
            }

            toast.success('Event added successfully');

            console.log('Response:', response2);
            } catch (error) {
              console.error('Error:', error);
              toast.error('An unexpected error occurred');
            } finally {
              setSubmitting(false);
            }
          }}
        >
        <Form>
          <div className="organiser_create_event_row_div">
            <label htmlFor="name">{t('title')}*</label>
            <Field className="organiser_create_event-from_input" type="text" name="name" placeholder="Title" />
          </div>
          <ErrorMessage className="error" name="name" component="div" />
          <div className="organiser_create_event_row_div">
            <label htmlFor="description">{t('description')}*</label>
            <Field as="textarea" className="organiser_create_event-from_input_textbox" type="text" maxLength="255" name="description"  placeholder="Description"/>
          </div>
          <ErrorMessage className="error" name="description" component="div" />
          <div className="organiser_create_event_row_div">
            <label htmlFor="imageUrl">{t('imageURL')}</label>
            <Field className="organiser_create_event-from_input" type="text" name="imageUrl" placeholder="Picture Url" />
            <ErrorMessage className="error" name="file" component="div" />
          </div>
          <br/>
          <div className="organiser_create_event_address-form">
            <label htmlFor="address">{t('address')}*</label>
            <div className="organiser_create_event_address-form_top">
              <div className="organiser_create_event_row_div_address">
                <div className="address_error">
                  <Field className="organiser_create_event-from_input" type="text" name="street" placeholder="Street" />
                  <ErrorMessage className="error" name="street" component="div" />
                </div>
                <div className="address_error">
                  <Field className="organiser_create_event-from_input" type="text" name="homeNum"  placeholder="Number"/>
                  <ErrorMessage className="error" name="homeNum" component="div" />
                </div>
              </div>
              <Field as="textarea" className="organiser_create_event-from_input_textbox" type="text" maxLength="255" name="addressDescription"  placeholder="Describe how to get there"/>              
              <ErrorMessage className="error" name="addressDescription" component="div" />
            </div>
          </div>
          <br/>
          <div className="organiser_create_event_row_div">
            <label htmlFor="districtId">{t('district')}*</label>
            <Field as="select" className="organiser_create_event-from_input_dropdown" type="text" name="districtId"  placeholder="District">
              <option value="" disabled >{t('SelectDistrict')}</option>
              {districts.map(district => (
                <option key={district.id} value={district.id}>{district.name}</option>
              ))}
            </Field>
          </div>
          <ErrorMessage className="error" name="district" component="div" />
          <br/>
          <div className="organiser_create_event_row_div">
            <label htmlFor="categories">{t('categories')}*</label>
           <Field as="select" className="organiser_create_event-from_input_dropdown" type="text" name="categories" placeholder="Category" >
              <option value="" disabled >{t('SelectCategory')}</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </Field>
          </div>
          <br/>  
          <div className="checkbox_organiser_create_event-group">
            <label htmlFor="peselVerificationRequired">
              <Field type="checkbox" name="peselVerificationRequired"/>
              {t('peselVerificationNeeded')}
            </label>
            <label htmlFor="agreementNeeded">
              <Field type="checkbox" name="agreementNeeded"/>
              {t('volunteerAgreementNeeded')}
            </label>
          </div>
          <br/>  
          {/* <p className="organiser_create_event_sub-title">Shifts</p>
          <div className="organiser_create_event_shifts">
            <div className="organiser_create_event_shifts_column">
              <div>
                <Field type="number" name="shift.year" min="2023"/>
                <Field type="number" name="shift.month" min="1" max="12"/>
                <Field type="number" name="shift.day" min="1" max="31"/>
              </div>
              <div>
              Start:
              <Field type="number" name="shift.starthour" min="1" max="24"/>
              :
              <Field type="number" name="shift.startmin" min="0" max="60"/>
                End:
              <Field type="number" name="shift.endhour" min="1" max="24"/>
              :
              <Field type="number" name="shift.endmin" min="0" max="60"/>
              </div>
            </div>
            <div>
              <span><b>{t('volunteersNeeded')}</b>: <Field type="number" name="shift.volunteersNum" min="1" max="12"/></span> 
              <p><span><b>{t('minimumAgeRequired')}</b>: <Field type="number" name="shift.minAge" min="0" max="99"/></span></p>
            </div>
             <div className="organiser_create_event_shifts_manage">
               <button className="organiser_create_event-form_button">Edit</button>
              <button className="organiser_create_event-form_button">Delete</button>
            </div>
          </div> */}
          {/* <button className="organiser_create_event_shifts_button" disabled>Add shift</button> */}
          <br/>
          <div className="button-group">
            <button className="organiser_create_event-form_button" type="submit">{t('createEvent')}</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default OrganiserCreateEvent;