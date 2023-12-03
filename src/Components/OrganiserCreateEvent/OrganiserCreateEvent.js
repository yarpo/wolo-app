import { Formik, Field, Form, ErrorMessage } from "formik";

import '../../styles/organiser-create-event.scss';

const OrganiserCreateEvent = () => {

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
  
  return errors;
};

  return (
    <div className="create_event_div">
      <h1 className="create_event_title">Create Event</h1>
      <p className="create_event_sub-title">Inputs marked with * are required</p>
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
            <div className="name-container">
              
                <label htmlFor="title">Title*</label>
                <Field className="create_event-from_input" type="text" name="title" placeholder="Title" />
                <ErrorMessage className="error" name="title" component="div" />
              </div>

              <div className="description">
                <label htmlFor="description">Description*</label>
                <textarea className="create_event-from_input_textbox" type="text" maxLength="255" name="description"  placeholder="Description"/>
              </div>
            

            <label htmlFor="picture">Picture</label>
            <Field className="signup-from_input" type="file" name="picture" />
            <ErrorMessage className="error" name="file" component="div" />
            <br/>

            <label htmlFor="address">Address*</label>
            <div name="create_event_address-form">
            <Field className="signup-from_input" type="text" name="addressStreet" placeholder="Street" />
            <ErrorMessage className="error" name="addressStreet" component="div" />
            <Field className="signup-from_input" type="text" name="addressNumber"  placeholder="Number"/>
            <ErrorMessage className="error" name="addressNumber" component="div" />
            </div>
            <textarea className="create_event-from_input_textbox" type="text" name="addressDescription" placeholder="Describe how to get there" />
            <ErrorMessage className="error" name="addressDescription" maxLength="255" component="div" />
            <br/>

            <label htmlFor="district">District*</label>
            <select className="create_event-from_input_dropdown" type="text" name="district"  placeholder="District">
              <option value="volvo">Chełm</option>
              <option value="saab">Zaspa</option>
              <option value="fiat">Śródmieście</option>
            </select>
            <ErrorMessage className="error" name="district" component="div" />
            <br/>
            <label htmlFor="categories">Categories*</label>
            <select className="create_event-from_input_dropdown" type="text" name="categories"  placeholder="Category">
              <option value="volvo">Pomoc Bezdomnym</option>
              <option value="saab">Wyprowadzanie</option>
            </select>
            <ErrorMessage className="error" name="district" component="div" />
            <br/>


            <div className="checkbox_signup-group">
              <label htmlFor="peselVerification">
                <Field type="checkbox" name="peselVerification" />
                Pesel verification needed
              </label>

              <label htmlFor="volunteerAgreement">
                <Field type="checkbox" name="volunteerAgreement" />
                Volunteer agreement needed
              </label>
            </div>
            <br/>
            <div className="button-group">
            <button className="signup-form_button">Add shift</button>
            <button className="signup-form_button" type="submit" disabled={isSubmitting}>
              Create
            </button>

          </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default OrganiserCreateEvent;