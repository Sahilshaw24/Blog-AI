import React from 'react'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import BlogList from '../Components/BlogList'
import Newsletter from '../Components/Newsletter'
import Footer from '../Components/Footer'

export default function Home() {
  return (
    <div>

   <Navbar/>
   <Header/>
   <BlogList/>
   <Newsletter/>
   <Footer/>
    </div>
  )
}
