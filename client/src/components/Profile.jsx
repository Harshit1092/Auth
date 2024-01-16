import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import user from '../assets/img/user.jpeg';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import validator from 'validator';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [mobile, setMobile] = useState();
  const [address, setAddress] = useState('');

  // cool stuff starts
  const [_name, _setName] = useState('');
  const [_education, _setEducation] = useState('');
  const [_mobile, _setMobile] = useState();
  const [_address, _setAddress] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  //   console.log(currentUser);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/get-profile?userId=${currentUser.id}`
        );
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setEducation(response.data.user.education);
        setMobile(response.data.user.mobile);
        setAddress(response.data.user.address);

        _setName(name);
        _setEducation(education);
        _setMobile(mobile);
        _setAddress(address);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  async function updateProfile(e) {
    e.preventDefault();
    if (!_name || !_education || !_mobile || !_address) {
      toast.error('Please fill all the fields');
      return;
    }

    // check if phone no. is valid
    if (!validator.isMobilePhone(_mobile)) {
      toast.error('Please enter a valid phone no.');
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        `http://localhost:8000/update-profile?id=${currentUser.id}`,
        {
          name: _name,
          education: _education,
          mobile: _mobile,
          address: _address,
        }
      );
      console.log(response.data);
      toast.success('Profile updated successfully 🥰');
      setName(_name);
      setEducation(_education);
      setMobile(_mobile);
      setAddress(_address);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className='w-full mt-8 flex justify-center items-center mb-10'>
        <Card className='flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500'>
          <h1 className='text-4xl font-bold mb-4 mt-7 text-white'>
            USER PROFILE
          </h1>
          <div className='flex flex-col md:flex-row'>
            <Card className='mt-6 w-full md:w-96 rounded-none border-none shadow-lg bg-white'>
              <CardHeader className='relative h-56 border-none shadow-none object-contain'>
                <img src={user} alt='card-image' />
              </CardHeader>
              <CardBody>
                <Typography variant='h5' color='gray' className='mb-2'>
                  Your Profile
                </Typography>
                <Typography className=''>
                  <div className='mb-4'>
                    <span className='font-bold text-gray-700'>Name:</span>{' '}
                    {name}
                  </div>
                  <div className='mb-4'>
                    <span className='font-bold text-gray-700'>Email:</span>{' '}
                    {email}
                  </div>
                  <div className='mb-4'>
                    <span className='font-bold text-gray-700'>Education:</span>{' '}
                    {education}
                  </div>
                  <div className='mb-4'>
                    <span className='font-bold text-gray-700'>Mobile:</span>{' '}
                    {mobile}
                  </div>
                  <div>
                    <span className='font-bold text-gray-700'>Address:</span>{' '}
                    {address}
                  </div>
                </Typography>
              </CardBody>
            </Card>
            <Card className='mt-6 w-full md:w-96 rounded-none border-none shadow-lg bg-white'>
              <CardBody>
                <Typography variant='h5' color='gray' className='mb-2'>
                  Update User Information
                </Typography>
                <form>
                  <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-medium mb-2'>
                      Name
                    </label>
                    <input
                      type='text'
                      className='border-2 border-gray-300 p-2 w-full'
                      value={_name}
                      onChange={(e) => _setName(e.target.value)}
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-medium mb-2'>
                      Education
                    </label>
                    <input
                      type='text'
                      className='border-2 border-gray-300 p-2 w-full'
                      value={_education}
                      onChange={(e) => _setEducation(e.target.value)}
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-medium mb-2'>
                      Mobile
                    </label>
                    <input
                      type='number'
                      className='border-2 border-gray-300 p-2 w-full'
                      value={_mobile}
                      onChange={(e) => _setMobile(e.target.value)}
                    />
                  </div>
                  <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-medium mb-2'>
                      Address
                    </label>
                    <input
                      type='tel'
                      className='border-2 border-gray-300 p-2 w-full'
                      value={_address}
                      onChange={(e) => _setAddress(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={updateProfile}
                    className={`ml-2 px-4 py-2 text-sm font-medium  bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
                      isLoading ? 'bg-blue-400' : 'bg-[#2563EB]'
                    } text-white`}
                    disabled={isLoading}
                  >
                    Update Information
                  </button>
                </form>
              </CardBody>
              <CardFooter className='pt-0'>
                {/* Additional buttons or content can be added here */}
              </CardFooter>
            </Card>
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
