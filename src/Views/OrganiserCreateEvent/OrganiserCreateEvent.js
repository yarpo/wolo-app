import { Button, Checkbox, Label,  Textarea, TextInput } from 'flowbite-react';
import { Formik, Field, Form } from 'formik';

const OrganiserCreateEvent = () => {
  const user = JSON.parse(localStorage.getItem('user'));
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

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-20" style={{ minHeight: 'calc(100vh - 60px)' }}>
      <div className="flex max-w-md flex-col gap-4">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <Label htmlFor="name" value="Event Title" />
              <Field as={TextInput} id="name" type="text" sizing="md" name="name" />

              <Label htmlFor="description" value="Description" />
              <Field as={Textarea} id="description" sizing="md" name="description" />

              <Label htmlFor="imageUrl" value="Image URL" />
              <Field as={TextInput} id="imageUrl" type="text" sizing="md" name="imageUrl" />

              <Label htmlFor="cityId" value="City ID" />
              <Field as={TextInput} id="cityId" type="text" sizing="md" name="cityId" />

              <Label htmlFor="isPeselVerificationRequired" value="Is PESEL Verification Required?" />
              <Field as={Checkbox} id="isPeselVerificationRequired" name="isPeselVerificationRequired" />

              <Label htmlFor="isAgreementNeeded" value="Is Agreement Needed?" />
              <Field as={Checkbox} id="isAgreementNeeded" name="isAgreementNeeded" />

              <Button type="submit" variant="primary" disabled={isSubmitting}>Submit</Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default OrganiserCreateEvent;