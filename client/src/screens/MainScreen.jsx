
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainScreen = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <div className="bg-gray-900 text-white py-20">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Welcome to the Blogging Application</h1>
                    <p className="text-lg mb-8">Share your thoughts and ideas with the world</p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Get Started
                    </button>
                </div>
            </div>

            <div className="bg-gray-100 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
                    <div className="grid grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4">Article 1</h3>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4">Article 2</h3>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4">Article 3</h3>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-200 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Trending Topics</h2>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4">Topic 1</h3>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4">Topic 2</h3>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-300 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8">Latest Updates</h2>
                    <div className="grid grid-cols-4 gap-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4">Update 1</h3>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4">Update 2</h3>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4">Update 3</h3>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold mb-4">Update 4</h3>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MainScreen;
