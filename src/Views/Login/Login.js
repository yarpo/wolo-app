import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Field } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/login.scss';
import { URLS } from '../../config.js';
import fetchUser from '../../Utils/fetchUser.js';
import { TextInput } from 'flowbite-react'; 
import { HiMail, HiEye, HiEyeOff } from 'react-icons/hi';

const Login = ({ setToken, setUser }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const fetchUserData = async () => {
    const user = await fetchUser();
    setId(user.id);
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
      setToken(data.accessToken);
      setUser(data.user );
      
      if (values.rememberMe) {
        localStorage.setItem('rememberMe', values.email);
        localStorage.setItem('password', values.password);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('password');
      }

      const userResponse = await fetch(URLS.USER, {
        headers: {
          'Authorization': `Bearer ${data.accessToken}`
        }
      });
      const userData = await userResponse.json();
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      navigate('/');
      window.location.reload();
    } else {
      toast.error('Failed to login. Please check your credentials.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (id !== null) {
      navigate('/events');
    }
  }, [id, navigate]);

  useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe');
    const password = localStorage.getItem('password');

    if (rememberMe && password) {
      handleLogin({ email: rememberMe, password: password });
    }
  }, []);

  return (
    <div className="login-form">
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = t('field')  + ' "' + t('email') + '" ' + t('required');
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = t('invalidEmail');
          }
          if (!values.password) {
            errors.password = t('field')  + ' "' + t('password') + '" ' + t('required'); 
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
            <h1 className="login-form__title">{t('logIn')}</h1>
            <p className="login-form_subtitle">{t('continue')}</p>
            <div className="max-w-md">
              <TextInput 
                id="email4" 
                type="email"
                name='email' 
                icon={HiMail} 
                placeholder={t('email')}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email} 
                required 
              />
            </div>
            {errors.email && touched.email && <span className="error">{errors.email} </span>}
            <br />
          <div className="max-w-md">
            <TextInput 
              id="password1"
              placeholder={t('password')}
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              required
              icon={showPassword ? HiEyeOff : HiEye}
              iconClick={toggleShowPassword}
            />
          </div>
            {errors.password && touched.password && <span className="error">{errors.password}</span>}
            <Link to="/forgot-password" className="login-form_forgot-password">{t('forgotPassword')}</Link>
            <div className="checkbox-container">
              <input
                onClick={toggleShowPassword}
                type="checkbox"
                id="showPassword"
                name="showPassword"
              />
              <span className="checkbox-text">{t('showPassword')}</span>
            </div>
            <div className="checkbox-container">
              <Field type="checkbox" id="keepMeLoggedIn" name="keepMeLoggedIn" />
              <span className="checkbox-text" htmlFor="keepMeLoggedIn">{t('keepMeLoggedIn')}</span>
            </div>
            <br />
            <button className="login-form__button" type="submit" disabled={isSubmitting}>
              {t('logIn')}
            </button>
            <p className="login-form_register-text">
              {t('dontHaveAccount')} <Link className="login-form_register-text" to="/signup">{t('registerNow')}</Link>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;