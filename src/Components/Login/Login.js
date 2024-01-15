import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Formik } from "formik";
import { Link } from "react-router-dom";
import '../../styles/login.scss';
import {axiosInstance, setAuthToken} from '../../Utils/axiosInstance'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

   const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = (event) => {
  event.preventDefault();
  window.location.href = 'http://localhost:8080/auth/google';
}
    const handleLogin = async (values) => {
        try {
            const response = await axiosInstance.post('/auth/login', {
                email: values.email,
                password: values.password
            });
            const token = response.data.accessToken;
            localStorage.setItem('token', token);
            setAuthToken(token);

        } catch (error) {
            console.error('Login error:', error);
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
            <button className="login-form__button" type="button" onClick={handleGoogleLogin}>G - {t('continueWithGoogle')}</button>
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
