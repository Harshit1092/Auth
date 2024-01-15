
import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import user from '../assets/img/user.jpeg';
import Navbar from './Navbar';
import Footer from './Footer';

const Profile = () => {
    return (
        <>
        <Navbar />
        <div className='w-full mt-8 flex justify-center items-center mb-10'>
            <Card className='flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500'>
                <h1 className='text-4xl font-bold mb-4 mt-7 text-white'>USER PROFILE</h1>
                <div className='flex flex-col md:flex-row'>
                    <Card className="mt-6 w-full md:w-96 rounded-none border-none shadow-lg bg-white">
                        <CardHeader className="relative h-56 border-none shadow-none object-contain">
                            <img
                                src={user}
                                alt="card-image"
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h5" color="gray" className="mb-2">
                                Sahil
                            </Typography>
                            <Typography className=''>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700">Name:</span> Sahil
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700">Email:</span> sahilmangla7@gmail.com
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700">Education:</span> B.Tech from IIT ROPAR
                                </div>
                                <div className="mb-4">
                                    <span className="font-bold text-gray-700">Mobile:</span> 9817634727
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700">Address:</span> House No: 93, Scheme No: 19, Vivekanand Nagar, Jind (Haryana)
                                </div>
                            </Typography>
                        </CardBody>
                    </Card>
                    <Card className="mt-6 w-full md:w-96 rounded-none border-none shadow-lg bg-white">
                        <CardBody>
                            <Typography variant="h5" color="gray" className="mb-2">
                                Update User Information
                            </Typography>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                                    <input type="text" className="border-2 border-gray-300 p-2 w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Education</label>
                                    <input type="text" className="border-2 border-gray-300 p-2 w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Mobile</label>
                                    <input type="tel" className="border-2 border-gray-300 p-2 w-full" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-medium mb-2">Address</label>
                                    <input type="tel" className="border-2 border-gray-300 p-2 w-full" />
                                </div>
                                <Button type="submit" color="blue">Update Information</Button>
                            </form>
                        </CardBody>
                        <CardFooter className="pt-0">
                            {/* Additional buttons or content can be added here */}
                        </CardFooter>
                    </Card>
                </div>
            </Card>
        </div>
        <Footer />
        </>
        
    )
}

export default Profile;
