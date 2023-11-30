import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    adultConfirmation: false,
    termsAndConditions: false,
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Signup</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="firstName">First Name</label>
              <Field type="text" name="firstName" />
              <ErrorMessage name="firstName" component="div" />

              <label htmlFor="lastName">Last Name</label>
              <Field type="text" name="lastName" />
              <ErrorMessage name="lastName" component="div" />
            </div>

            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
            <br/>

            <label htmlFor="phonenumber">Phone Number (Optional)</label>
            <Field type="text" name="phoneNumber" />
            <ErrorMessage name="phoneNumber" component="div" />
             <br/>

            <label htmlFor="password">Password</label>
            <Field type={showPassword ? "text" : "password"} name="password" />
            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} /> Show Password
            <ErrorMessage name="password" component="div" />
             <br/>

            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field type={showConfirmPassword ? "text" : "password"} name="confirmPassword" />
            <input type="checkbox" onChange={() => setShowConfirmPassword(!showConfirmPassword)} /> Show Password
            <ErrorMessage name="confirmPassword" component="div" />
             <br/>

            <label htmlFor="adultConfirmation">
              <Field type="checkbox" name="adultConfirmation" />
              I confirm that I am an adult (over 18 years old)
            </label>

            <label htmlFor="termsAndConditions">
              <Field type="checkbox" name="termsAndConditions" />
              I have read and accept the terms and conditions
            </label>
            <br/>

            <button type="submit" disabled={isSubmitting}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      <hr />
      <p>Or continue with your email address</p>
      <button>Sign Up with Google</button>
      <p>Already have an account? <a href="/login">Login now</a></p>
    </div>
  );
}

export default Signup;