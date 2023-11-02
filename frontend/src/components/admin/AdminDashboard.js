import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import AllUsers from './AllUsers';
import CardData from './CardData';
import UserCalories from './UserCalories';

const FOOD_ENTRIES_URL = 'http://localhost:3000/api/food_entries';

const AdminDashboard = () => {
  const auth = useAuth();
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    axios
      .get(FOOD_ENTRIES_URL, {
        headers: { Authorization: auth.user.token },
      })
      .then((response) => {
        setAdminData(response.data);
      });
  }, []);

  return (
    <div className='container mt-5'>
      {adminData && (
        <>
          <div className='row'>
            <div className='col-xl-6 col-lg-6'>
              <CardData
                title={'Current Week Food Entries'}
                value={adminData.current_week_entries}
              />
            </div>
            <div className='col-xl-6 col-lg-6'>
              <CardData
                title={'Previous Week Food Entries'}
                value={adminData.previous_week_entries}
              />
            </div>
          </div>
          <UserCalories caloriesList={adminData.number_of_calories_per_user} />
          <AllUsers />
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
