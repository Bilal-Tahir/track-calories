import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth';
import '../../assets/login.css';

const SINGLE_FOOD = 'http://localhost:3000/api/food_entries/';
const GET_MEALS = 'http://localhost:3000/api/meals';

const validationSchema = yup.object().shape({
  meal_id: yup.string().required('Please select a meal'),
  name: yup.string().required('Food Name is required'),
  calorie_value: yup
    .number()
    .typeError('Calories must be a number')
    .required('Calories are required')
    .min(0, 'Calories must be a positive number or zero'),
  entry_time: yup.date().required('Date is required'),
});

const EditFoodEntry = () => {
  const { id } = useParams();
  const auth = useAuth();

  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(null);

  useEffect(() => {
    getFoodRecord();
    getMealList();
  }, []);

  const getFoodRecord = () => {
    axios
      .get(`${SINGLE_FOOD}/${id}`, {
        headers: { Authorization: auth.user.token },
      })
      .then((response) => {
        const foodData = response.data;
        formik.setValues({
          meal_id: foodData.meal.id,
          name: foodData.name,
          calorie_value: foodData.calorie_value,
          entry_time: foodData.entry_time,
        });
        setError(null);
      })
      .catch((error) => {
        setError('error');
      });
  };

  const getMealList = () => {
    axios
      .get(`${GET_MEALS}`, {
        headers: { Authorization: auth.user.token },
      })
      .then((response) => {
        setMeals(response.data);
      })
      .catch((error) => {
        setError('error');
      });
  };

  const formik = useFormik({
    initialValues: {
      meal_id: '',
      name: '',
      calorie_value: '',
      entry_time: '',
    },
    onSubmit: async (values) => {
      try {
        await validationSchema.validate(values);

        const editedFoodEntry = {
          name: values.name,
          calorie_value: values.calorie_value,
          entry_time: new Date(values.entry_time).toISOString(),
          meal_id: values.meal_id,
        };

        axios
          .put(
            `${SINGLE_FOOD}/${id}`,
            { food_entry: editedFoodEntry },
            {
              headers: { Authorization: auth.user.token },
            }
          )
          .then((response) => {
            setUpdated('success');
          })
          .catch((error) => setUpdated('error'));
      } catch (validationError) {
        console.error(validationError);
      }
    },
    validationSchema,
  });

  const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
    formik;

  return (
    <div className='container mt-5'>
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='col-md-8'>
          <form id='regForm' onSubmit={handleSubmit}>
            <h2 id='register'>Edit Food Entry</h2>
            {error ? (
              <div className='alert alert-danger' role='alert'>
                Error in Fetching Food Record
              </div>
            ) : (
              <>
                {updated && (
                  <div
                    className={`alert ${
                      updated === 'error'
                        ? 'alert-food-error'
                        : 'alert-food-success'
                    }`}
                    role='alert'
                  >
                    {updated === 'error' ? (
                      <>
                        <i className='fas fa-exclamation-circle'></i>{' '}
                        <span style={{ marginLeft: '10px' }}>
                          <b>Error!! </b>
                          Please enter correct details.
                        </span>
                      </>
                    ) : (
                      <>
                        <i className='fas fa-check'></i>{' '}
                        <span style={{ marginLeft: '10px' }}>
                          <b>Success! </b> Food Entry has been updated
                          successfully.
                        </span>
                      </>
                    )}
                  </div>
                )}

                {/* Render form fields */}
                <div className='mb-3'>
                  <label htmlFor='name' className='form-label'>
                    Select Meal:
                  </label>
                  <select
                    className='form-control'
                    id='meal_id'
                    name='meal_id'
                    value={values.meal_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value=''>Select a meal</option>
                    {meals.map((meal) => (
                      <option key={meal.id} value={meal.id}>
                        {meal.meal_category}
                      </option>
                    ))}
                  </select>
                  {touched.meal_id && errors.meal_id && (
                    <div className='text-danger'>{errors.meal_id}</div>
                  )}
                </div>

                <div className='mb-3'>
                  <label htmlFor='name' className='form-label'>
                    Food Name:
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.name && errors.name && (
                    <div className='text-danger'>{errors.name}</div>
                  )}
                </div>

                <div className='mb-3'>
                  <label htmlFor='calorie_value' className='form-label'>
                    Calories:
                  </label>
                  <input
                    type='number'
                    className='form-control'
                    id='calorie_value'
                    name='calorie_value'
                    value={values.calorie_value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.calorie_value && errors.calorie_value && (
                    <div className='text-danger'>{errors.calorie_value}</div>
                  )}
                </div>

                <div className='mb-3'>
                  <label htmlFor='entry_time' className='form-label'>
                    Date:
                  </label>
                  <input
                    type='date'
                    className='form-control'
                    id='entry_time'
                    name='entry_time'
                    value={values.entry_time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.entry_time && errors.entry_time && (
                    <div className='text-danger'>{errors.entry_time}</div>
                  )}
                </div>

                <button type='submit' className='btn btn-primary'>
                  Submit
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditFoodEntry;
