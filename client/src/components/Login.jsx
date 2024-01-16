import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      toast.error('Please fill in all fields');
    } else if (!validator.isEmail(email)) {
      console.log('invalid email');
      toast.error('Please enter a valid email address');
    } else {
      // submit the form
      const user = {
        email,
        otp,
      };

      try {
        setIsLoading2(true);
        await axios.post('http://localhost:8000/login', user);
        /*
        login stuff
        here we'll set the reponse
         */

        navigate('/');
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading2(false);
      }
      console.log(user);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      toast.error('Please enter your email address');
    } else if (!validator.isEmail(email)) {
      toast.error('Please enter a valid email address');
    } else {
      try {
        setIsLoading(true);
        const response = await axios.post(
          'http://localhost:8000/sendloginotp',
          { email: email }
        );
        console.log(response.data);
        toast.success('OTP sent successfully 🥰');
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
            <img
              className='w-8 h-8 mr-2'
              src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
              alt='logo'
            />
            LOGIN
          </div>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Sign in to your account
              </h1>
              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Your email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='name@company.com'
                    required=''
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
                {/* <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div> */}
                <div>
                  <label
                    htmlFor='otp'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    OTP
                  </label>
                  <div className='flex'>
                    <input
                      type='text'
                      name='otp'
                      value={otp}
                      id='otp'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Enter OTP'
                      required={true}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    <button
                      type='button'
                      onClick={handleSendOTP}
                      disabled={isLoading}
                      className={`ml-2 px-4 py-2 text-sm font-medium  bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
                        isLoading ? 'bg-blue-400' : 'bg-[#2563EB]'
                      } text-white hover:bg-primary-700`}
                    >
                      Send OTP
                    </button>
                  </div>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                      <input
                        id='remember'
                        aria-describedby='remember'
                        type='checkbox'
                        className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                        required=''
                      />
                    </div>
                    <div className='ml-3 text-sm'>
                      {/* <label
                        htmlFor='remember'
                        className='text-gray-500 dark:text-gray-300'
                      >
                        Remember me
                      </label> */}
                    </div>
                  </div>
                  <Link
                    to='#'
                    className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type='submit'
                  className={`${
                    isLoading2 ? 'bg-blue-400' : 'bg-[#2563EB]'
                  } w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                >
                  Sign in
                </button>
                <p className='text-sm font-light t  ext-gray-500 dark:text-gray-400'>
                  Don’t have an account yet?{' '}
                  <Link
                    to='/signup'
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
