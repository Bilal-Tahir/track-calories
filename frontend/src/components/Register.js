import React, { useState } from 'react';
import { useAuth } from './auth';
import { useFormik } from 'formik';
import * as yup from 'yup';
import '../assets/login.css';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const Register = () => {
  const auth = useAuth();

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: '',
        email: '',
      },
      validationSchema,
      onSubmit: async (values) => {
        auth.register(values);
      },
    });

  return (
    <div className='container mt-5'>
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='col-md-8'>
          <form id='regForm' onSubmit={handleSubmit}>
            <h2 id='register'>Create a New Account</h2>

            <div className='form-group'>
              <label htmlFor='name'>Enter Name</label>
              <input
                type='text'
                className='form-control'
                name='name'
                aria-describedby='nameHelp'
                placeholder='Enter name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.name && errors.name && (
                <div className='text-danger'>{errors.name}</div>
              )}
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Email address</label>
              <input
                type='email'
                className='form-control'
                name='email'
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
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
