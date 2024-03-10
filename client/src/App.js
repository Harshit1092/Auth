import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Blog from './components/CreateBlog';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import MainScreen from './screens/MainScreen';
import { useAuth } from './context/AuthContext';
function App() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <div>
      {/* <Spinner /> */}
      <Routes>
        <Route
          exact
          path='/MainScreen'
          element={
            currentUser ? <MainScreen /> : <Navigate to='/login' replace />
          }
        />
        <Route
          exact
          path='/'
          element={
            currentUser ? <Dashboard /> : <Navigate to='/login' replace />
          }
        />
        <Route
          exact
          path='/profile'
          element={currentUser ? <Profile /> : <Navigate to='/login' replace />}
        />
        <Route
          exact
          path='/create-blog'
          element={currentUser ? <Blog /> : <Navigate to='/login' replace />}
        />
        <Route
          path='/login'
          element={currentUser ? <Navigate to='/' replace /> : <Login />}
        />
        <Route
          path='/signup'
          element={currentUser ? <Navigate to='/' replace /> : <SignUp />}
        />
      </Routes>
    </div>
  );
}

export default App;
