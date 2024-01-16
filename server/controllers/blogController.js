const mongoose = require('mongoose')
const Blog = require('../models/Blog')

const getAllBlogs = async (req, res) => {
    try{
        const blogs = await Blog.find({})
        res.status(200).json(blogs)
    }
    catch(error){
        res.status(500).json({ error: error.message })
    }
}

const createBlog = async (req, res) => {
    const { title, description, content, author } = req.body

    if(!title || !description || !content || !author){
        return res.status(400).json({ error: 'Please provide all required fields' })
    }

    try{
        const blog = await Blog.create({ title, description, content, author })
        res.status(201).json(blog)
    }
    catch(error){
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getAllBlogs,
    createBlog
}