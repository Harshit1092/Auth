const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title']
    },
    description: {
        type: String,
        required: [true, 'Please enter a body']
    },
    content: {
        type: String,
        required: [true, 'Please enter a content']
    },
    author: {
        type: String,
        required: [true, 'Please enter a author']
    },
})


const Blog = mongoose.model('blog', blogSchema)
module.exports = Blog