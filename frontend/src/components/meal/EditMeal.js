import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../../assets/login.css';

const SINGLE_MEAL = 'http://localhost:3000/api/meals/';

const EditMeal = () => {
  const { id } = useParams();
  const auth = useAuth();
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Meal Name is required'),
    max_entries: Yup.number().integer('Max Entries must be an integer'),
  });

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    setValues, // Add setValues here
  } = useFormik({
    initialValues: {
      name: '',
      max_entries: '',
      meal_category: '',
    },
    validationSchema,
    onSubmit: (values) => {
      axios
        .put(
          `${SINGLE_MEAL}/${id}`,
          {
            meal: values,
          },
          {
            headers: {
              Authorization: auth.user.token,
            },
          }
        )
        .then((response) => {
          setUpdated('success');
        })
        .catch((error) => setUpdated('error'));
    },
  });

  useEffect(() => {
    axios
      .get(`${SINGLE_MEAL}/${id}`, {
        headers: { Authorization: auth.user.token },
      })
      .then((response) => {
        setValues(response.data); // Use setValues to update formik values
        setError(null);
      })
      .catch((error) => {
        setError('error');
      });
  }, [id, auth.user.token]);

  return (
    <div className='container mt-5'>
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='col-md-8'>
          {error ? (
            <div className='alert alert-danger' role='alert'>
              Error in Fetching Single Meal
            </div>
          ) : (
            <>
              {updated && (
                <div className='alert alert-primary text-center' role='alert'>
                  Data Updated {updated === 'error' ? 'Failed' : 'Success'}
                </div>
              )}
              <form id='regForm' onSubmit={handleSubmit}>
                <h2 id='register'>Edit Meal</h2>
                <div className='mb-3'>
                  <label htmlFor='name' className='form-label'>
                    Meal Name
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleChange}
                  />
                  {touched.name && errors.name ? (
                    <div className='text-danger'>{errors.name}</div>
                  ) : null}
                </div>
                <div className='mb-3'>
                  <label htmlFor='meal_category' className='form-label'>
                    Meal Category
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    name='meal_category'
                    value={values.meal_category}
                    onChange={handleChange}
                    onBlur={handleChange}
                    disabled
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='max_entries' className='form-label'>
                    Max Entries
                  </label>
                  <input
                    type='number'
                    className='form-control'
                    name='max_entries'
                    value={values.max_entries}
                    onChange={handleChange}
                    onBlur={handleChange}
                    disabled
                  />
                  {touched.max_entries && errors.max_entries ? (
                    <div className='text-danger'>{errors.max_entries}</div>
                  ) : null}
                </div>
                <button type='submit' className='btn btn-primary'>
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditMeal;
