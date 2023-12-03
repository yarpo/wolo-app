import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import '../../styles/signup.scss';

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

  const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'First Name is required';
  }

  if (!values.lastName) {
    errors.lastName = 'Last Name is required';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Confirm Password is required';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }

  if (!values.adultConfirmation) {
    errors.adultConfirmation = 'Adult confirmation is required';
  }

  if (!values.termsAndConditions) {
    errors.termsAndConditions = 'Acceptance of terms and conditions is required';
  }
  
  return errors;
};

  return (
    <div className="signup_div">
      <h1 className="signup_title">Signup</h1>
      <p className="signup_sub-title">Begin your journey ad a volunteer</p>
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
              <div className="name-field">
                <label htmlFor="firstName">First Name</label>
                <Field className="signup-from_input" type="text" name="firstName" />
                <ErrorMessage className="error" name="firstName" component="div" />
              </div>

              <div className="name-field">
                <label htmlFor="lastName">Last Name</label>
                <Field className="signup-from_input" type="text" name="lastName" />
                <ErrorMessage className="error" name="lastName" component="div" />
              </div>
            </div>

            <label htmlFor="email">Email</label>
            <Field className="signup-from_input" type="email" name="email" />
            <ErrorMessage className="error" name="email" component="div" />
            <br/>

            <label htmlFor="phonenumber">Phone Number (Optional)</label>
            <Field className="signup-from_input" type="text" name="phoneNumber" />
            <ErrorMessage className="error" name="phoneNumber" component="div" />
             <br/>

            <div className="password-field">
              <label htmlFor="password">Password</label>
              <Field className="signup-from_input" type={showPassword ? "text" : "password"} name="password" placeholder="Password" />
              <ErrorMessage className="error" name="password" component="div" />
              <div className="checkbox-container">
                <input id="showPassword" type="checkbox" onChange={() => setShowPassword(!showPassword)} />
                <label htmlFor="showPassword">Show Password</label>
              </div>
            </div>

            <div className="password-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field className="signup-from_input" type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="confirm password" />
              <ErrorMessage className="error" name="confirmPassword" component="div" />
              <div className="checkbox-container">
                <input id="showConfirmPassword" type="checkbox" onChange={() => setShowConfirmPassword(!showConfirmPassword)} />
                <label htmlFor="showConfirmPassword">Show Password</label>
              </div>
            </div>
             <br/>

            <div className="checkbox-group">
              <label htmlFor="adultConfirmation">
                <Field type="checkbox" name="adultConfirmation" />
                I confirm that I am an adult (over 18 years old)
              </label>

              <label htmlFor="termsAndConditions">
                <Field type="checkbox" name="termsAndConditions" />
                I have read and accept the terms and conditions
              </label>
            </div>
            <br/>
            <div className="button-group">
            <button className="signup-form_button" type="submit" disabled={isSubmitting}>
              Sign Up
            </button>
            <div className="line-text">
              <hr />
              <p>Or continue with your email address</p>
              <hr />
            </div>
            <button className="signup-form_button">Sign Up with Google</button>
            <p>Already have an account? <Link className="login-form_register-text" to="/login">Login now</Link></p>
          </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;