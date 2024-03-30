import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Formik } from "formik";
import { Link } from "react-router-dom";
import '../../styles/login.scss';
import { URLS } from '../../config.js';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

const handleLogin = async (values) => {
  const response = await fetch(URLS.AUTHENTICATE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('token', data.accessToken);
  } else {
    console.error('Failed to login'); //alert to do
  }
};

  return (
    <div className="login-form" >
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
            <form onSubmit={(event) => {
                event.preventDefault();
                handleLogin(values);
            }}>
            <h1 className="login-form__title">{t('login')}</h1>
            <p className="login-form_subtitle" >{t('continue')}</p>
            <button className="login-form__button" type="button">G - {t('continueWithGoogle')}</button>
           <div className="login-form_paragraph-container">
              <hr />
                <p className="login-form_paragraph">{t('orContinueWith')}</p>
              <hr />
           </div>
            <input
              className="login-form__input"
              placeholder={t('email')}
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && <span className="error">{errors.email} *</span>}
            <br />
            <Link className="login-form_forgot-password">{t('forgotPassword')}</Link>
            <input
              className="login-form__input"
              placeholder={t('password')}
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && <span className="error">{errors.password} *</span>}
            <br />
            <div className="checkbox-container">
              <input
                onClick={toggleShowPassword}
                type="checkbox"
                id="showPassword"
                name="showPassword"
              />
              <span className="checkbox-text" >{t('showPassword')}</span>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="keepMeLoggedIn"
                name="keepMeLoggedIn"
              />
              <span className="checkbox-text">{t('keepMeLoggedIn')}</span>
            </div>
            <br />
            <button className="login-form__button" type="submit" disabled={isSubmitting}>
              {t('login')}
            </button>
            <p className="login-form_register-text">
              {`Don't have an account?`} <Link className="login-form_register-text" to="/signup">{t('signUpNow')}</Link>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;