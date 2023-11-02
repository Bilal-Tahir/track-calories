import React, { useState } from 'react';
import { useAuth } from './auth';
import { useFormik } from 'formik';
import * as yup from 'yup';
import '../assets/login.css';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

const Login = () => {
  const auth = useAuth();

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
      },
      validationSchema,
      onSubmit: async (values) => {
        auth.login(values.email);
      },
    });

  return (
    <div className='container mt-5'>
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='col-md-8'>
          <form id='regForm' onSubmit={handleSubmit}>
            <h2 id='register'>Login To Calorie Tracker App</h2>

            <div className='form-group'>
              <label htmlFor='email'>Email address</label>
              <input
                type='email'
                className='form-control'
                id='email'
                aria-describedby='emailHelp'
                placeholder='Enter email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email && (
                <div className='text-danger'>{errors.email}</div>
              )}
            </div>
            <button type='submit' className='btn btn-primary'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
