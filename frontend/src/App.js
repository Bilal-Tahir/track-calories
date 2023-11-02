import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { AuthProvider } from './components/auth';
import './App.css';
import Login from './components/Login';
import RequireAuth from './components/RequireAuth';
import MealList from './components/meal/MealList';
import EditMeal from './components/meal/EditMeal';
import AddNewFoodEntry from './components/foodEntries/AddNewFoodEntry';
import EditFoodEntry from './components/foodEntries/EditFoodEntry';
import AdminDashboard from './components/admin/AdminDashboard';
import Error from './components/Error';
import Register from './components/Register';
import InviteFriend from './components/InviteFriend';

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route
              path='/'
              element={
                <RequireAuth allowedRoles={['user']}>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path='/meals'
              element={
                <RequireAuth allowedRoles={['admin', 'user']}>
                  <MealList />
                </RequireAuth>
              }
            />
            <Route
              path='/add-new-food'
              element={
                <RequireAuth allowedRoles={['user', 'admin']}>
                  <AddNewFoodEntry />
                </RequireAuth>
              }
            />
            <Route
              path='/edit-meal/:id'
              element={
                <RequireAuth allowedRoles={['admin']}>
                  <EditMeal />
                </RequireAuth>
              }
            />
            <Route
              path='/edit-food/:id'
              element={
                <RequireAuth allowedRoles={['user', 'admin']}>
                  <EditFoodEntry />
                </RequireAuth>
              }
            />
            <Route
              path='/admin'
              element={
                <RequireAuth allowedRoles={['admin']}>
                  <AdminDashboard />
                </RequireAuth>
              }
            />
            <Route
              path='/invite-friend'
              element={
                <RequireAuth allowedRoles={['user']}>
                  <InviteFriend />
                </RequireAuth>
              }
            />
            <Route
              path='/get-user-food-record/:id'
              element={
                <RequireAuth allowedRoles={['admin']}>
                  <Home mode='admin' />
                </RequireAuth>
              }
            />
            <Route
              path='/error'
              element={
                <RequireAuth>
                  <Error />
                </RequireAuth>
              }
            />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
