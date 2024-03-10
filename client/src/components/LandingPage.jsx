import React from 'react';

const LandingPage = () => {
    return (
        <div className="bg-gray-100">
            {/* Hero Section */}
            <section className="bg-blue-500 text-white py-20">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Welcome to our Blogging Application</h1>
                    <p className="text-lg">Start sharing your thoughts and ideas with the world.</p>
                </div>
            </section>

            {/* Section 1 */}
            <section className="bg-gray-200 py-16">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Section 1</h2>
                    <p className="text-lg">This is the first section of the landing page.</p>
                </div>
            </section>

            {/* Section 2 */}
            <section className="bg-gray-300 py-16">
                <div className="container mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Section 2</h2>
                    <p className="text-lg">This is the second section of the landing page.</p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
