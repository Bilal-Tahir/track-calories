import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth';
import { Link } from 'react-router-dom';
import '../../assets/foodlist.css';

const GET_MEALS = 'http://localhost:3000/api/meals';

const MealList = () => {
  const auth = useAuth();
  const [meals, setMeals] = useState(null);
  useEffect(() => {
    axios
      .get(GET_MEALS, {
        headers: { Authorization: auth.user.token },
      })
      .then((response) => {
        setMeals(response.data);
      });
  }, []);

  return (
    <div className='main-content'>
      <div className='container mt-5 mb-2'>
        <div className='row'>
          <div className='col'>
            <div className='card shadow'>
              <div className='card-header border-0'>
                <h3 className='mb-0'>Meal List</h3>
              </div>
              <div className='table-responsive'>
                <table className='table align-items-center table-flush'>
                  <thead className='thead-light'>
                    <tr>
                      <th scope='col'>Meal Name</th>
                      <th scope='col'>Meal Type</th>
                      <th scope='col'>Max Entries</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meals &&
                      meals.map((meal) => (
                        <tr key={meal.id}>
                          <td>{meal.name}</td>
                          <td>{meal.meal_category}</td>
                          <td>{meal.max_entries}</td>
                          <td>
                            <Link
                              to={`/edit-meal/${meal.id}`}
                              className='btn btn-outline-dark'
                            >
                              <i className='far fa-pen-to-square'></i>
                              <span>Edit Meal</span>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className='card-footer py-4'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealList;
