import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import '../assets/navbar.css';

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogut = () => {
    auth.logout();
    navigate('/login');
  };

  return (
    <div className='container-fluid'>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <NavLink className='navbar-brand' to='/'>
                Calorie Tracker
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/meals'>
                Meals
              </NavLink>
            </li>
            {auth && auth.user?.userData?.role === 'admin' && (
              <li className='nav-item'>
                <NavLink className='nav-link' to='/admin'>
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <span className='navbar-text'>
            {!auth.user ? (
              <>
                <NavLink className='btn btn-outline-success' to='/Login'>
                  Login
                </NavLink>
                <NavLink className='btn btn-outline-success' to='/register'>
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  className='btn btn-outline-success'
                  to='/invite-friend'
                >
                  Invite a Friend
                </NavLink>
                <button className='btn btn-outline-dark' onClick={handleLogut}>
                  Logout
                </button>
              </>
            )}
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
