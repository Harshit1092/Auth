import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Dashboard from './components/Dashboard';
import MainScreen from './screens/MainScreen';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Blog from './components/CreateBlog';
import Blogs from './components/Blogs';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Spinner from './components/Spinner';
import Sidebar from './components/Sidebar';
import AuthContextProvider from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <div>
        {/* <Spinner /> */}
        <Routes>
          <Route exact path='/MainScreen' Component={MainScreen} />
          <Route exact path='/' Component={Dashboard} />
          <Route path='/login' Component={Login} />
          <Route path='/signup' Component={SignUp} />
          <Route path='/profile' Component={Profile} />
          <Route path='/create-blog' Component={Blog} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
