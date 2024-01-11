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
    
    if (!values.addressStreet) {
      errors.addressStreet = 'Address street is required';
    }

    if (!values.addressNumber) {
      errors.addressNumber = 'Address number is required';
    }

    if (!values.addressDescription) {
      errors.addressDescription = 'Address description is required';
    }

    return errors;
  };

  return (
    <div className="organiser_create_event_div">
      <h1 className="organiser_create_event_title">Create Event</h1>
      <p className="organiser_create_event_sub-title_disclaimer">Inputs marked with * are required</p>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <div className="organiser_create_event_row_div">
            <label htmlFor="title">Title*</label>
            <Field className="organiser_create_event-from_input" type="text" name="title" placeholder="Title" />
            </div>
            <ErrorMessage className="error" name="title" component="div" />
            
            <div className="organiser_create_event_row_div">
            <label htmlFor="description">Description*</label>
            <Field as="textarea" className="organiser_create_event-from_input_textbox" type="text" maxLength="255" name="description"  placeholder="Description"/>            </div>
            <ErrorMessage className="error" name="description" component="div" />
            <div className="organiser_create_event_row_div">
            <label htmlFor="picture">Picture</label>
            <Field className="organiser_create_event-from_input" type="file" name="picture" />
            <ErrorMessage className="error" name="file" component="div" />
            </div>
            <br/>
            <div className="organiser_create_event_address-form">
              <label htmlFor="address">Address*</label>
              <div className="organiser_create_event_address-form_top">
                <div className="organiser_create_event_row_div_address">
                  <Field className="organiser_create_event-from_input" type="text" name="addressStreet" placeholder="Street" />
                  <ErrorMessage className="error" name="addressStreet" component="div" />
                  <Field className="organiser_create_event-from_input" type="text" name="addressNumber"  placeholder="Number"/>
                  <ErrorMessage className="error" name="addressNumber" component="div" />
                </div>
              
                <Field as="textarea" className="organiser_create_event-from_input_textbox" type="text" maxLength="255" name="addressDescription"  placeholder="Describe how to get there"/>              <ErrorMessage className="error" name="addressDescription" component="div" />
              </div>
            </div>
            <br/>

            <div className="organiser_create_event_row_div">
            <label htmlFor="district">District*</label>
            <Field as="select" className="organiser_create_event-from_input_dropdown" type="text" name="district"  placeholder="District">
              <option value="place_1">Chełm</option>
              <option value="place_2">Zaspa</option>
              <option value="place_3">Śródmieście</option>
            </Field>
            </div>
            <ErrorMessage className="error" name="district" component="div" />
            <br/>

            <div className="organiser_create_event_row_div">
            <label htmlFor="categories">Categories*</label>
            <Field as="select" className="organiser_create_event-from_input_dropdown" type="text" name="categories"  placeholder="Category">
              <option value="help_1">Pomoc Bezdomnym</option>
              <option value="help_2">Wyprowadzanie</option>
            </Field>
            <ErrorMessage className="error" name="category" component="div" />
            </div>
            <br/>
            
            <div className="checkbox_organiser_create_event-group">
              <label htmlFor="peselVerification">
                <Field type="checkbox" name="peselVerification"/>
                Pesel verification needed
              </label>

              <label htmlFor="volunteerAgreement">
                <Field type="checkbox" name="volunteerAgreement"/>
                Volunteer agreement needed
              </label>
            </div>
            
            <br/>
            
            <p className="organiser_create_event_sub-title">Shifts</p>
            <div className="organiser_create_event_shifts">
              <div className="organiser_create_event_shifts_column">
                <span>31.02.2024</span>
                <p><span>07:00-14:00</span></p>
                <span>ul. Wrót Baldura 666</span>
              </div>
              <div>
                <span><b>Volunteers needed</b>: 4</span> 
                <p><span><b>Minimum age required</b>: 2</span></p>
                <span><b>Leader required</b>: No</span>
              </div>
              <div className="organiser_create_event_shifts_manage">
                <button className="organiser_create_event-form_button">Edit</button>
                <button className="organiser_create_event-form_button">Delete</button>
              </div>
            </div>

            <div className="organiser_create_event_shifts">
              <div className="organiser_create_event_shifts_column">
                <span>31.02.2024</span>
                <p><span>07:00-14:00</span></p>
                <span>ul. Wrót Baldura 666</span>
              </div>
              <div>
                <span><b>Volunteers needed</b>: 4</span>
                <p><span><b>Minimum age required</b>: 2</span></p>
                <span><b>Leader required</b>: No</span>
              </div>
              <div className="organiser_create_event_shifts_manage">
                <button className="organiser_create_event-form_button">Edit</button>
                <button className="organiser_create_event-form_button">Delete</button>
              </div>
            </div>
            
            <button className="organiser_create_event_shifts_button">Add shift</button>

            <div className="button-group">
            <button className="organiser_create_event-form_button" type="submit">Create</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default OrganiserCreateEvent;