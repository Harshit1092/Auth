const express = require('express')
const router = express.Router()
const {getAllBlogs, createBlog} = require('../controllers/blogController')


router.get('/').get(getAllBlogs).post(createBlog)

module.exports = router
