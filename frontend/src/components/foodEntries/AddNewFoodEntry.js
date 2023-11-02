import { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useAuth } from '../auth';
import '../../assets/login.css';

const GET_MEALS = 'http://localhost:3000/api/meals';
const FOOD_ENTRIES = 'http://localhost:3000/api/food_entries/';

const AddNewFoodEntry = () => {
  const auth = useAuth();
  const [meals, setMeals] = useState([]);
  const [updated, setUpdated] = useState(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    axios
      .get(GET_MEALS, {
        headers: { Authorization: auth.user.token },
      })
      .then((response) => {
        setMeals(response.data);
      });
  };

  const validationSchema = yup.object().shape({
    selectedMeal: yup.string().required('Select a meal'),
    name: yup.string().required('Food Name is required'),
    calories: yup
      .number()
      .typeError('Calories must be a number')
      .min(0, 'Calories must be a positive number or zero')
      .required('Calories is required'),
    entry_time: yup.date().required('Date is required'),
  });

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      selectedMeal: '',
      name: '',
      calories: '',
      entry_time: '',
    },
    validationSchema,
    onSubmit: async ({ selectedMeal, name, calories, entry_time }) => {
      const newFoodEntry = {
        meal_id: selectedMeal,
        name,
        calorie_value: calories,
        entry_time: new Date(entry_time).toISOString(),
      };

      axios
        .post(
          FOOD_ENTRIES,
          {
            food_entry: newFoodEntry,
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

  return (
    <div className='container mt-5'>
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='col-md-8'>
          {updated && (
            <div
              className={`alert ${
                updated === 'error' ? 'alert-food-error' : 'alert-food-success'
              }`}
              role='alert'
            >
              {updated === 'error' ? (
                <>
                  <i className='fas fa-exclamation-circle'></i>{' '}
                  <span style={{ marginLeft: '10px' }}>
                    <b>Error!! </b>
                    Not able to add a new food entry.
                  </span>
                </>
              ) : (
                <>
                  <i className='fas fa-check'></i>{' '}
                  <span style={{ marginLeft: '10px' }}>
                    <b>Success! </b> Food Entry has been added successfuly.
                  </span>
                </>
              )}
            </div>
          )}
          <form id='regForm' onSubmit={handleSubmit}>
            <h2 id='register'>Add New Food Entry</h2>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Select Meal:
              </label>
              <select
                className='form-control'
                name='selectedMeal'
                value={values.selectedMeal}
                onChange={handleChange}
              >
                <option value=''>Select a meal</option>
                {meals.map((meal) => (
                  <option key={meal.id} value={meal.id}>
                    {meal.meal_category}
                  </option>
                ))}
              </select>
              {touched.selectedMeal && errors.selectedMeal && (
                <div className='form-error'>{errors.selectedMeal}</div>
              )}
            </div>
            <div className='mb-3'>
              <label htmlFor='category' className='form-label'>
                Food Name:
              </label>
              <input
                type='text'
                className='form-control'
                name='name'
                value={values.name}
                onChange={handleChange}
              />
              {touched.name && errors.name && (
                <div className='form-error'>{errors.name}</div>
              )}
            </div>
            <div className='mb-3'>
              <label htmlFor='entries' className='form-label'>
                Calories:
              </label>
              <input
                type='number'
                name='calories'
                value={values.calories}
                onChange={handleChange}
              />
              {touched.calories && errors.calories && (
                <div className='form-error'>{errors.calories}</div>
              )}
            </div>
            <div className='mb-3'>
              <label htmlFor='entries' className='form-label'>
                Date:
              </label>
              <input
                type='date'
                name='entry_time'
                value={values.entry_time}
                onChange={handleChange}
              />
              {touched.entry_time && errors.entry_time && (
                <div className='form-error'>{errors.entry_time}</div>
              )}
            </div>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewFoodEntry;
