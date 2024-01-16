import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { currentUser, signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [education, setEducation] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [acceptedTerms, setAcceptedTerms] = React.useState(false); // Add state for accepted terms
  const [otpSent, setOtpSent] = React.useState(false); // Add state for OTP sent

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading2(true);
      const user = { name, email, education, phone, otp };

      console.log(validator.isEmail(email));

      if (!validator.isEmail(email)) {
        console.log('email is not valid');
        toast.error('Please enter a valid email');
        return;
      }

      if (!name || !email || !education || !phone || !otp) {
        toast.error('Please fill all the fields');
        return;
      }

      // check if phone no. is valid
      if (!validator.isMobilePhone(phone)) {
        toast.error('Please enter a valid phone no.');
        return;
      }

      if (!acceptedTerms) {
        // Check if terms are accepted
        toast.error('Please accept the terms and conditions');
        return;
      }

      // make an axios request to the backend
      const response = await axios.post('http://localhost:8000/signup', {
        name,
        email,
        education,
        phone,
        otp,
      });
      console.log(response);

      signup(response.data);

      navigate('/');
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setIsLoading2(false);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (!validator.isEmail(email)) {
        console.log('email is not valid');
        toast.error('Please enter a valid email');
        return;
      }

      const respone = await axios.post('http://localhost:8000/sendsignupotp', {
        email: email,
      });

      console.log('OTP : ', respone);

      // console.log('OTP sent');
      // toast.success('OTP sent successfully');
      setOtpSent(true); // Update OTP sent state
      toast.success('OTP sent successfully 🥰');
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  async function onResendOTP(e) {
    e.preventDefault();
    try {
      setIsLoading3(true);
      const response = await axios.post('http://localhost:8000/resendotp', {
        email: email,
      });
      toast.success('OTP sent successfully 🥰');
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading3(false);
    }
  }

  return (
    <div>
      <ToastContainer />
      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8'>
          <div className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
            <img
              className='w-8 h-8 mr-2'
              src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg'
              alt='logo'
            />
            SIGNUP
          </div>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Create an account
              </h1>
              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor='name'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={name}
                    id='name'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='XYZ'
                    required={true}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
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
                    value={email}
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='name@company.com'
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor='education'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Education
                  </label>
                  <input
                    type='text'
                    name='education'
                    value={education}
                    id='education'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='abc School'
                    required={true}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor='text'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Phone no.
                  </label>
                  <input
                    type='text'
                    name='phone'
                    value={phone}
                    id='phone'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='1234567890'
                    required={true}
                    onChange={(e) => setPhone(e.target.value)}
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
                                        value={password}
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required={true}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="confirm-password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Confirm password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirm-password"
                                        value={confirmPassword}
                                        id="confirm-password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required={true}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                      className={`ml-2 px-4 py-2 text-sm font-medium  bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
                        isLoading ? 'bg-blue-400' : 'bg-[#2563EB]'
                      } text-white hover:bg-primary-700`}
                      onClick={handleSendOTP}
                    >
                      Send OTP
                    </button>
                  </div>
                </div>

                {otpSent && (
                  <button
                    className={`ml-2 px-4 py-2 text-sm font-medium  bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
                      isLoading3 ? 'bg-blue-400' : 'bg-[#2563EB]'
                    } text-white hover:bg-primary-700`}
                    onClick={onResendOTP}
                  >
                    Resend otp
                  </button>
                )}
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='terms'
                      aria-describedby='terms'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      htmlFor='terms'
                      className='font-light text-gray-500 dark:text-gray-300'
                    >
                      I accept the{' '}
                      <Link
                        className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                        to='#'
                      >
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>
                </div>
                <button
                  type='submit'
                  className={`w-full ${
                    isLoading2 ? 'bg-blue-400' : 'bg-[#2563EB]'
                  } text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                >
                  Create an account
                </button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  Already have an account?{' '}
                  <Link
                    to='/login'
                    className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  >
                    Login here
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

export default SignUp;
