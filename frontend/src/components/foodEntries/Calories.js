import React from 'react';
import moment from 'moment';
import { useAuth } from '../auth';
import '../../assets/calories.css';

const Calories = ({ caloriesList }) => {
  const auth = useAuth();
  return (
    <div className='container mt-3'>
      <h3 className='bg-black p-2 border-top border-bottom'>
        Daily Calories Consumption
      </h3>
      <ul className='list-group list-group-light'>
        {Object.entries(caloriesList.daily_calories).map(([date, calories]) => (
          <li className='list-group-item d-flex justify-content-between align-items-center'>
            <div>
              <div className='fw-bold'>
                <strong>{moment(date).format('ddd, DD MMM YYYY')}</strong>
              </div>
              <div className='text-muted'>
                {calories} calories has been consumed.
              </div>
            </div>
            <span
              class={`badge ${
                calories > auth.user?.useData?.daily_calorie_limit || 2.1
                  ? 'badge-danger'
                  : ' badge-success'
              } rounded-pill`}
            >
              {calories > auth.user?.useData?.daily_calorie_limit || 2.1
                ? 'Over Limit'
                : 'Under Limit'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calories;
