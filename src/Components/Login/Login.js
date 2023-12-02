import React, { useState } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import '../../styles/login.scss';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

   const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLogin = (event) => {
  event.preventDefault();
  // Handle Google login here
}
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
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <h1 className="login-form__title">Log In</h1>
            <p className="login-form_subtitle" >Continue your journey as a volunteer</p>
            <button className="login-form__button" type="button" onClick={handleGoogleLogin}>G - Continue with Google</button>
           <div className="login-form_paragraph-container">
              <hr />
                <p className="login-form_paragraph">Or continue with your email address</p>
              <hr />
           </div>
            <input
              className="login-form__input"
              placeholder="Email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && <span className="error">{errors.email} *</span>}
            <br />
            <Link className="login-form_forgot-password">Forgot password</Link>
            <input
              className="login-form__input"
              placeholder="Password"
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
              <span className="checkbox-text" >Show my password</span>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="keepMeLoggedIn"
                name="keepMeLoggedIn"
              />
              <span className="checkbox-text">Keep me logged in</span>
            </div>
            <br />
            <button className="login-form__button" type="submit" disabled={isSubmitting}>
              Log in
            </button>
            <p className="login-form_register-text">
              {`Don't have an account?`} <Link className="login-form_register-text" to="/signup">Register now</Link>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
