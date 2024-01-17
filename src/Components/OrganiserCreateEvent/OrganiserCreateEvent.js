import { Formik, Field, Form, ErrorMessage } from "formik";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import '../../styles/organiser-create-event.scss';

const OrganiserCreateEvent = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  const initialValues = {
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
  };

  const validate = values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Title is required';
    }

    if (!values.description) {
     errors.description = 'Description is required';
    }

    if (!values.districtId) {
      errors.districtId = 'District is required';
    } 

    if (!values.categories) {
      errors.categories = 'At least one category is required';
    }
    
    if (!values.street) {
      errors.street = 'Address street is required';
    }

    if (!values.homeNum) {
      errors.homeNum = 'Address number is required';
    }

    return errors;
  };

  

  return (
    <div className="organiser_create_event_div">
      <h1 className="organiser_create_event_title">{t('createEvent')}</h1>
      <p className="organiser_create_event_sub-title_disclaimer">{t('inputsAreRequired')}</p>
      <Formik
        initialValues={initialValues}
        validate={validate}
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
          <ErrorMessage className="error" name="title" component="div" />
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
                <Field className="organiser_create_event-from_input" type="text" name="street" placeholder="Street" />
                <ErrorMessage className="error" name="street" component="div" />
                <Field className="organiser_create_event-from_input" type="text" name="homeNum"  placeholder="Number"/>
                <ErrorMessage className="error" name="homeNum" component="div" />
              </div>      
              <Field as="textarea" className="organiser_create_event-from_input_textbox" type="text" maxLength="255" name="addressDescription"  placeholder="Describe how to get there"/>
              <ErrorMessage className="error" name="addressDescription" component="div" />
            </div>
          </div>
          <br/>
          <div className="organiser_create_event_row_div">
            <label htmlFor="districtId">{t('district')}*</label>
            <Field as="select" className="organiser_create_event-from_input_dropdown" type="text" name="districtId"  placeholder="District">
              <option value="1">Centrum, Warszawa</option>
              <option value="2">Wrzeszcz, Gdańsk</option>
              <option value="3">Śródmieście, Gdańsk</option>
            </Field>
          </div>
          <ErrorMessage className="error" name="district" component="div" />
          <br/>
          <div className="organiser_create_event_row_div">
            <label htmlFor="categories">{t('categories')}*</label>
            <Field as="select" className="organiser_create_event-from_input_dropdown" type="text" name="categories"  placeholder="Category">
              <option value="1">Sport</option>
              <option value="2">Pomoc</option>
            </Field>
            <ErrorMessage className="error" name="category" component="div" />
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
          <p className="organiser_create_event_sub-title">Shifts</p>
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
          </div>
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