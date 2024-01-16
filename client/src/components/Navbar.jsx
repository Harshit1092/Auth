import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import user from '../assets/img/user.jpeg';
import blog from '../assets/img/blog.png';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className='bg-blue-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <img className='h-8 w-8 rounded-full' src={blog} alt='Logo' />
            </div>
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-4'>
                <Link
                  to='/'
                  className='text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium'
                >
                  Home
                </Link>
                <Link
                  to='/Profile'
                  className='text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium'
                >
                  Profile
                </Link>
                <Link
                  to='/create-blog'
                  className='text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium'
                >
                  Create Blog
                </Link>
                {/* <Link to="/contact" className="text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium">Contact</Link> */}
              </div>
            </div>
          </div>
          <div className='hidden md:block'>
            <div className='ml-4 flex items-center md:ml-6'>
              {/* <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">View notifications</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button> */}
              <div className='ml-3 relative'>
                <div className='flex'>
                  <button
                    className='max-w-xs bg-blue-900 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-900 focus:ring-white'
                    id='user-menu'
                    aria-haspopup='true'
                  >
                    <span className='sr-only'>Open user menu</span>
                    <img
                      className='h-8 w-8 rounded-full'
                      src={user}
                      alt='User Avatar'
                    />
                  </button>
                  <button
                    onClick={handleLogout}
                    className='text-white hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium ml-3'
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='-mr-2 flex md:hidden'>
            <button
              className='bg-blue-900 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-900 focus:ring-white'
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className={`block h-6 w-6 ${isMenuOpen ? 'hidden' : ''}`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? '' : 'hidden'}`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
          <Link
            to='/'
            className='text-white hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium'
          >
            Home
          </Link>
          <Link
            to='/Profile'
            className='text-white hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium'
          >
            Profile
          </Link>
          <Link
            to='/create-blog'
            className='text-white hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium'
          >
            Create Blog
          </Link>
          {/* <Link to="/contact" className="text-white hover:bg-blue-800 block px-3 py-2 rounded-md text-base font-medium">Contact</Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
