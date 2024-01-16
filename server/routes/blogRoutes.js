const express = require('express')
const router = express.Router()
const {getAllBlogs, createBlog} = require('../controllers/blogController')


router.get('/', getAllBlogs)
router.post('/createBlog', createBlog)

module.exports = router
