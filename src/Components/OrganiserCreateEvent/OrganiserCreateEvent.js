import { Formik, Field, Form, ErrorMessage } from "formik";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import '../../styles/organiser-create-event.scss';
import fetchData from '../../Utils/fetchData.js';
import * as Yup from 'yup';

const OrganiserCreateEvent = () => {
  
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([])
  const [suggestedCategory, setSuggestedCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');


  useEffect(() => {
    fetchData('http://localhost:8080/categories', setCategories);
    fetchData('http://localhost:8080/districts', setDistricts);
  }, []);

  const suggestCategory = async (description) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/suggest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (response.ok) {
      const result = await response.json();
      setSuggestedCategory(result);
      
      setSelectedCategory(result.id);

    } else {
      console.error('Error fetching suggestion:', response.statusText);
    }
    } catch (error) {
      console.error('Error fetching suggestion:', error);
    }
  };

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
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);

          values.organisationId = 1;
          values.categories = [parseInt(values.categories, 10)];
          values.shifts = [
            {
              startTime: [values.shift.starthour, values.shift.startmin],
              endTime: [values.shift.endhour, values.shift.endmin],
              date: [values.shift.year, values.shift.month, values.shift.day],
              capacity: values.shift.volunteersNum,
              isLeaderRequired: false,
              requiredMinAge: values.shift.minAge,
            },
          ];

          delete values.shift

          const jsonData = JSON.stringify(values);
          console.log(jsonData);

          fetch('http://localhost:8080/events/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: jsonData,
          })
            .then(response => {
              console.log('Response:', response);
              setSubmitting(false);
            })
            .catch(error => {
              console.error('Error:', error);
              setSubmitting(false);
            })
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
              <option value="" disabled selected>{t('SelectDistrict')}</option>
              {districts.map(district => (
                <option key={district.id} value={district.id}>{district.name}</option>
              ))}
            </Field>
          </div>
          <ErrorMessage className="error" name="district" component="div" />
          <br/>
          <div className="organiser_create_event_row_div">
            <label htmlFor="categories">{t('categories')}*</label>
            <Field as="select" className="organiser_create_event-from_input_dropdown" type="text" name="categories" placeholder="Category" value={selectedCategory}>
              <option value="" disabled>{t('SelectCategory')}</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
             ))}
            </Field>
            {suggestedCategory && (
              <p>Suggested category : {suggestedCategory.name}</p>
            )}
            <ErrorMessage className="error" name="category" component="div" />
            <button
              className="organiser_create_event_shifts_button"
              onClick={() => {
                const currentDescription = document.getElementsByName('description')[0]?.value;
                if (currentDescription) {
                  suggestCategory(currentDescription);
                }
              }}
            >
              Get Category Suggestion
            </button>
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
          <button className="organiser_create_event_shifts_button" disabled>Add shift</button>
          <div className="button-group">
            <button className="organiser_create_event-form_button" type="submit">{t('createEvent')}</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default OrganiserCreateEvent;