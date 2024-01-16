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
    title: '',
    description: '',
    picture: '',
    addressStreet: '',
    addressNumber: '',
    addressDescription: '',
    district: '',
    categories: '',
    peselVerification: false,
    volunteerAgreement: false,
  };

  const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Title is required';
  }

  if (!values.description) {
    errors.description = 'Description is required';
  }

  if (!values.district) {
    errors.district = 'District is required';
  } 

  if (!values.categories) {
    errors.categories = 'At least one category is required';
  }
  
  if (!values.addressStreet) {
    errors.categories = 'At least one category is required';
  }
  
  if (!values.addressNumber) {
    errors.categories = 'At least one category is required';
  }
  
  if (!values.addressDescription) {
    errors.categories = 'At least one category is required';
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
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>

          <div className="organiser_create_event_row_div">
            <label htmlFor="title">{t('title')}*</label>
            <Field className="organiser_create_event-from_input" type="text" name="title" placeholder="Title" />
            </div>
            <ErrorMessage className="error" name="title" component="div" />
            
            <div className="organiser_create_event_row_div">
              <label htmlFor="description">{t('description')}*</label>
              <textarea className="organiser_create_event-from_input_textbox" type="text" maxLength="255" name="description"  placeholder="Description"/>
            </div>
            <ErrorMessage className="error" name="description" component="div" />
            <div className="organiser_create_event_row_div">
            <label htmlFor="picture">{t('imageURL')}</label>
            <Field className="organiser_create_event-from_input" type="file" name="picture" />
            <ErrorMessage className="error" name="file" component="div" />
            </div>
            <br/>
            <div className="organiser_create_event_address-form">
              <label htmlFor="address">{t('address')}*</label>
              <div className="organiser_create_event_address-form_top">
                <div className="organiser_create_event_row_div_address">
                <Field className="organiser_create_event-from_input" type="text" name="addressStreet" placeholder="Street" />
                <ErrorMessage className="error" name="addressStreet" component="div" />
                <Field className="organiser_create_event-from_input" type="text" name="addressNumber"  placeholder="Number"/>
                <ErrorMessage className="error" name="addressNumber" component="div" />
                </div>
              
              <textarea className="organiser_create_event-from_input_textbox" type="text" name="addressDescription"  maxLength="255" placeholder="Describe how to get there" />
              <ErrorMessage className="error" name="addressDescription" component="div" />
              </div>
            </div>
            <br/>

            <div className="organiser_create_event_row_div">
            <label htmlFor="district">{t('district')}*</label>
            <Field as="select" className="organiser_create_event-from_input_dropdown" type="text" name="district"  placeholder="District">
              <option value="place_1">Chełm</option>
              <option value="place_2">Zaspa</option>
              <option value="place_3">Śródmieście</option>
            </Field>
            </div>
            <ErrorMessage className="error" name="district" component="div" />
            <br/>

            <div className="organiser_create_event_row_div">
            <label htmlFor="categories">{t('categories')}*</label>
            <Field as="select" className="organiser_create_event-from_input_dropdown" type="text" name="categories"  placeholder="Category">
              <option value="help_1">Pomoc Bezdomnym</option>
              <option value="help_2">Wyprowadzanie</option>
            </Field>
            <ErrorMessage className="error" name="category" component="div" />
            </div>
            <br/>
            
            <div className="checkbox_organiser_create_event-group">
              <label htmlFor="peselVerification">
                <Field type="checkbox" name="peselVerification" />
                {t('peselVerificationNeeded')}
              </label>

              <label htmlFor="volunteerAgreement">
                <Field type="checkbox" name="volunteerAgreement" />
                {t('volunteerAgreementNeeded')}
              </label>
            </div>
            
            <br/>
            
            <p className="organiser_create_event_sub-title">{t('shifts')}</p>
            <div className="organiser_create_event_shifts">
              <div className="organiser_create_event_shifts_column">
                <span>31.02.2024</span>
                <p><span>07:00-14:00</span></p>
                <span>ul. Wrót Baldura 666</span>
              </div>
              <div>
                <span><b>{t('volunteersNeeded')}</b>: 4</span> 
                <p><span><b>{t('minimumAgeRequired')}</b>: 2</span></p>
                <span><b>{t('leaderRequired')}</b>: No</span>
              </div>
              <div className="organiser_create_event_shifts_manage">
                <button className="organiser_create_event-form_button">{t('edit')}</button>
                <button className="organiser_create_event-form_button">{t('delete')}</button>
              </div>
            </div>
            
            <button className="organiser_create_event_shifts_button">{t('addShift')}</button>

            <div className="button-group">
            <button className="organiser_create_event-form_button" type="submit" disabled={isSubmitting}>
            {t('createEvent')}
            </button>

          </div>
          </Form>

        )}
      </Formik>
    </div>
  );
}

export default OrganiserCreateEvent;