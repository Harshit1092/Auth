
import React from 'react';

const Blogs = () => {
    const blogs = [
        {
            id: 1,
            title: 'Blog Title 1',
            description: 'Blog Description 1',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!',
            author: 'Author 1',
        },
        {
            id: 2,
            title: 'Blog Title 2',
            description: 'Blog Description 2',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!',
            author: 'Author 2',
        },
        {
            id: 1,
            title: 'Blog Title 1',
            description: 'Blog Description 1',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!',
            author: 'Author 1',
        },
        {
            id: 2,
            title: 'Blog Title 2',
            description: 'Blog Description 2',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!',
            author: 'Author 2',
        },
        {
            id: 1,
            title: 'Blog Title 1',
            description: 'Blog Description 1',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!',
            author: 'Author 1',
        },
        {
            id: 2,
            title: 'Blog Title 2',
            description: 'Blog Description 2',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos!',
            author: 'Author 2',
        },
        // Add more blogs here...
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 mx-10 mb-10">
            {blogs.map((blog) => (
                <div key={blog.id} className="bg-gray-100 p-4 shadow-md rounded-md">
                    <h2 className="text-xl font-bold mb-2 text-gray-800">{blog.title}</h2>
                    <p className="text-gray-500 mb-4">{blog.description}</p>
                    <p className="text-gray-700">{blog.content}</p>
                    <p className="text-gray-500 mt-2">Author: {blog.author}</p>
                </div>
            ))}
        </div>
    );
};

export default Blogs;
