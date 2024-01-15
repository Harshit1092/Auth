import React from 'react'
import Sidebar from './Sidebar'
import Profile from './Profile'
import Navbar from './Navbar'
import Footer from './Footer'
import Blogs from './Blogs'
import CreateBlog from './CreateBlog'
const Dashboard = () => {
  return (
    <div>
      {/* <Sidebar /> */}
      <Navbar />
      <Blogs />
      <Footer />
    </div>
  )
}

export default Dashboard
