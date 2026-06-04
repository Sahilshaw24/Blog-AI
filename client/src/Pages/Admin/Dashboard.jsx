import React, { useEffect, useState } from 'react'
import assets, { dashboard_data } from '../../assets/assets'
import BlogTableItem from '../../Components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'

export default function Dashboard() {
  const [dashData,setdashData]= useState({
    blogs:0,
    comments:0 ,
    drafts : 0,
    recentBlogs:[]

  })


  const {axios}= useAppContext()
  const fetchData =async ()=>{
    
  try {
        const {data} = await axios.get('/api/admin/dashboard')

        data.success ?  setdashData(data.dashboardData) : toast.error(data.message)
  } catch (error) {
         toast.error(error.message)
  }

  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
   <div className='flex flex-col w-full p-4 md:p-10 bg-blue-50/50'>
             
  {/* Stats cards wrapper */}
  <div className="flex flex-wrap gap-4">

    <div className="flex items-center gap-4 bg-white p-4 min-w-[58px] rounded shadow cursor-pointer hover:scale-105 transition-all">
      <img src={assets.dashboard_icon_1} alt="" />
      <div>
        <p className='text-xl font-semibold text-gray-600'>{dashData.blogs}</p>
        <p className='text-gray-400 font-light'>Blogs</p>
      </div>
    </div>

    <div className="flex items-center gap-4 bg-white p-4 min-w-[58px] rounded shadow cursor-pointer hover:scale-105 transition-all">
      <img src={assets.dashboard_icon_2} alt="" />
      <div>
        <p className='text-xl font-semibold text-gray-600'>{dashData.comments}</p>
        <p className='text-gray-400 font-light'>Comments</p>
      </div>
    </div>

    <div className="flex items-center gap-4 bg-white p-4 min-w-[58px] rounded shadow cursor-pointer hover:scale-105 transition-all">
      <img src={assets.dashboard_icon_3} alt="" />
      <div>
        <p className='text-xl font-semibold text-gray-600'>{dashData.drafts}</p>
        <p className='text-gray-400 font-light'>Drafts</p>
      </div>
    </div>
  </div>
  
  {/* Latest Blogs */}
  <div className="flex items-center gap-3 mt-6 text-gray-600">
    <div>
      <img src={assets.dashboard_icon_4} alt="" />
      <p>Latest Blogs</p>
    </div>
    <div className="relative  max-w-4xl overflow-x-auto shadow rounded-lg  scrollbar-hide bg-white ">
      <table className='md:w-[800px] w-full text-sm  text-gray-500'>
        <thead className=' text-xs text-gray-600 text-left uppercase'>
           <tr>
            <th scope='col' className='px-2 py-2 xl:px-6'>#</th>
            <th scope='col' className='px-2 py-2'>Blog Title</th>
            <th scope='col' className='px-2 py-2 max-sm:hidden'>Date</th>
            <th scope='col' className='px-2 py-2 max-sm:hidden'>Status</th>
            <th scope='col' className='px-2 py-2'>Action</th>
           </tr>
        </thead>
        <tbody>
          {dashData.recentBlogs.map((b,i)=>{
            return <BlogTableItem key={b._id} blog={b} fetchBlog={fetchData} index={i+1}/>

          })}

        </tbody>
      </table>
    </div>
  </div>
</div>

  )
}
