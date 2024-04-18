import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/signup.scss';
import { URLS } from '../../config.js';
import fetchUserId from '../../Utils/fetchUserId.js';

const Signup = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await fetchUserId();
      setId(userId);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (id !== null) {
      navigate('/events');
    }
  }, [id, navigate]);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    isAdult: false,
    termsAndConditions: false,
  };

const handleRegister = async (values) => {
  try {
    const response = await fetch(URLS.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });

    if (response.ok) {
      window.location.href = URLS.LOGIN;
    } else {
      console.error('Failed to register'); //alert to do
    }
  } catch (error) {
    console.error('Signup error:', error); //aletr to do
  }
};

console.log(handleRegister);

  const validate = values => {
    const errors = {};

    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'isAdult', 'termsAndConditions'];
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    if (values.email && !/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }

    return errors;
  };

  return (
    <div className="signup_div">
      <h1 className="signup_title">{t('signup')}</h1>
      <p className="signup_sub-title">{t('begin')}</p>
      <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={async (values, { setSubmitting }) => {
            handleRegister(values);
            setSubmitting(false);
          }}
        >
        {({ isSubmitting }) => (
          <Form>
            <div className="name-container">
              <div className="name-field">
                <label htmlFor="firstName">{t('firstName')}</label>
                <Field className="signup-from_input" type="text" name="firstName" />
                <ErrorMessage className="error" name="firstName" component="div" />
              </div>

              <div className="name-field">
                <label htmlFor="lastName">{t('lastName')}</label>
                <Field className="signup-from_input" type="text" name="lastName" />
                <ErrorMessage className="error" name="lastName" component="div" />
              </div>
            </div>

            <label htmlFor="email">{t('email')}</label>
            <Field className="signup-from_input" type="email" name="email" />
            <ErrorMessage className="error" name="email" component="div" />
            <br/>

            <label htmlFor="phonenumber">{t('phone')}</label>
            <Field className="signup-from_input" type="text" name="phoneNumber" />
            <ErrorMessage className="error" name="phoneNumber" component="div" />
             <br/>

            <div className="password-field">
              <label htmlFor="password">{t('password')}</label>
              <Field className="signup-from_input" type={showPassword ? "text" : "password"} name="password" placeholder={t('password')} />
              <ErrorMessage className="error" name="password" component="div" />
              <div className="checkbox_signup-container">
                <input id="showPassword" type="checkbox" onChange={() => setShowPassword(!showPassword)} />
                <label htmlFor="showPassword">{t('showPassword')}</label>
              </div>
            </div>

            <div className="password-field">
              <label htmlFor="confirmPassword">{t('confirmPassword')}</label>
              <Field className="signup-from_input" type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder={t('password')} />
              <ErrorMessage className="error" name="confirmPassword" component="div" />
              <div className="checkbox_signup-container">
                <input id="showConfirmPassword" type="checkbox" onChange={() => setShowConfirmPassword(!showConfirmPassword)} />
                <label htmlFor="showConfirmPassword">{t('showPassword')}</label>
              </div>
            </div>
             <br/>

            <div className="checkbox_signup-group">
              <label htmlFor="isAdult">
                <Field type="checkbox" name="isAdult" />
                {t('confirmAge')}
              </label>

              <label htmlFor="termsAndConditions">
                <Field type="checkbox" name="termsAndConditions" />
                {t('agreeTerms')}
              </label>
            </div>
            <br/>
            <div className="button-group">
            <button className="signup-form_button" type="submit" disabled={isSubmitting}>
              {t('signup')}
            </button>
            <div className="line-text">
              <hr />
              <p>{t('orContinueWithGoogle')}</p>
              <hr />
            </div>
            <button className="signup-form_button">{t('SignUpWithGoole')} </button>
            <p>{t('alreadyHaveAccount')}<Link className="login-form_register-text" to="/login">{t('loginNow')}</Link></p>
          </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;