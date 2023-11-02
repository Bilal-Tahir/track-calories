import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import '../../assets/foodlist.css';

const ALL_USERS = 'http://localhost:3000/api/users';

const AllUsers = () => {
  const auth = useAuth();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios
      .get(ALL_USERS, {
        headers: { Authorization: auth.user.token },
      })
      .then((response) => {
        setUsers(response.data);
      });
  }, []);
  return (
    <div className='main-content'>
      <div className='container-fluid mt-5 mb-2'>
        <h3 className='bg-black p-2 border-top border-bottom'>
          All Users List
        </h3>
        <div className='row'>
          <div className='col'>
            <div className='card shadow'>
              <div className='table-responsive'>
                <table className='table align-items-center table-flush'>
                  <thead className='thead-light'>
                    <tr>
                      <th scope='col'>User ID</th>
                      <th scope='col'>User Name</th>
                      <th scope='col'>Daily Calories Limit</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.daily_calorie_limit}</td>
                          <td>
                            <Link
                              to={`/get-user-food-record/${user.id}`}
                              className='btn btn-outline-dark'
                            >
                              Get Food Records
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

export default AllUsers;
