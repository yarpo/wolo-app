import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";


const Login = () => {
  return (
    <div className="login-Div" style={{ textAlign: 'center', marginTop: '50px' }}>
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
            <ha1>Login</ha1>
            <p>Continue your journey as a volunteer</p>
            <button type="submit">G-Continue with Google</button>
            <p>Or continue with your email address</p>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <br />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <br />
            <input
              type="checkbox"
              id="showPassword"
              name="showPassword"
            />
            <label htmlFor="showPassword">Show my password</label>
            <br />
            <input
              type="checkbox"
              id="keepMeLoggedIn"
              name="keepMeLoggedIn"
            />
            <label htmlFor="keepMeLoggedIn">Keep me logged in</label>
            <br />
            <button type="submit" disabled={isSubmitting}>
              Log in
            </button>
            <p>
              Dont have an account? <Link to="/signup">Register now</Link >
            </p>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default Login; 