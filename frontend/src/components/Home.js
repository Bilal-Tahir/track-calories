import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './auth';
import FoodList from './foodEntries/FoodList';
import { Link, useParams } from 'react-router-dom';
import Calories from './foodEntries/Calories';

const FOOD_ENTRIES_URL = 'http://localhost:3000/api/food_entries';

const filterFood = (data, meal) => {
  return (
    data !== null &&
    data.food_entries !== null &&
    data.food_entries.filter((food) => food.meal.meal_category === meal)
  );
};

const Home = ({ mode = 'user' }) => {
  const auth = useAuth();
  const [foodEntries, setFoodEntries] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { id } = useParams() || 0;

  useEffect(() => {
    if (mode === 'user') {
      getFood();
    } else {
      getUserFood();
    }
  }, []);

  const getUserFood = () => {
    axios
      .get(`http://localhost:3000/api/users/${id}/food_entries`, {
        headers: { Authorization: auth.user.token },
      })
      .then((response) => {
        setFoodEntries(response.data);
      });
  };

  const handleDateChange = (e) => {
    e.preventDefault();
    if (startDate && endDate) {
      axios
        .get(
          `${FOOD_ENTRIES_URL}/?start_date=${startDate}&end_date=${endDate}`,
          {
            headers: { Authorization: auth.user.token },
          }
        )
        .then((response) => {
          setFoodEntries(response.data);
        });
    }
  };

  const deleteFood = (id) => {
    axios
      .delete(`http://localhost:3000/api/food_entries/${id}`, {
        headers: { Authorization: auth.user.token },
      })
      .then((response) => {
        if (mode === 'admin') {
          getUserFood();
        } else {
          if (startDate && endDate) {
            axios
              .get(
                `${FOOD_ENTRIES_URL}/?start_date=${startDate}&end_date=${endDate}`,
                {
                  headers: { Authorization: auth.user.token },
                }
              )
              .then((response) => {
                setFoodEntries(response.data);
              });
          } else {
            getFood();
          }
        }
      });
  };

  const getFood = () => {
    axios
      .get(FOOD_ENTRIES_URL, {
        headers: { Authorization: auth.user.token },
      })
      .then((response) => {
        setFoodEntries(response.data);
      });
  };

  return (
    <div className='container mt-2'>
      <div className='row d-flex justify-content-center align-items-center'>
        <div className='col-md-12'>
          {foodEntries && mode !== 'admin' && (
            <Calories caloriesList={foodEntries} />
          )}
        </div>
        <div className='col-md-12 mt-4'>
          <div className='container mt-3'>
            <h3 className='bg-black p-2 border-top border-bottom'>
              Existing Food Entries List
            </h3>
            <div>
              <form className='date-form'>
                <input
                  type='date'
                  name='startDate'
                  className='date-form-input'
                  onChange={(date) => setStartDate(date.target.value)}
                />
                <h2 className='mt-2'>-</h2>
                <input
                  type='date'
                  name='endDate'
                  className='date-form-input'
                  onChange={(date) => setEndDate(date.target.value)}
                />
                <button
                  className='btn btn-outline-info'
                  style={{ borderRadius: '25px' }}
                  onClick={handleDateChange}
                >
                  Search
                </button>
              </form>
              <Link
                to={`/add-new-food`}
                className='btn btn-info'
                style={{ float: 'right' }}
              >
                Add Food Entry
              </Link>
            </div>
          </div>
        </div>
        <div className='col-md-12'>
          {mode !== 'admin' ? (
            <div className='Food-list'>
              <FoodList
                heading='Breakfast'
                foodEntries={foodEntries}
                foodData={filterFood(foodEntries, 'Breakfast')}
                deleteFood={deleteFood}
              />
              <FoodList
                heading='Lunch'
                foodEntries={foodEntries}
                foodData={filterFood(foodEntries, 'Lunch')}
                deleteFood={deleteFood}
              />
              <FoodList
                heading='Dinner'
                foodEntries={foodEntries}
                foodData={filterFood(foodEntries, 'Dinner')}
                deleteFood={deleteFood}
              />
            </div>
          ) : (
            <FoodList
              heading='User Data'
              foodEntries={foodEntries}
              foodData={foodEntries}
              deleteFood={deleteFood}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
