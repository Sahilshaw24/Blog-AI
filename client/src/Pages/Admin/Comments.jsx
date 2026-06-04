import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets'
import CommentTable from '../../Components/admin/CommentTable'
import { useAppContext } from '../../context/AppContext'

export default function Comments() {
  const [comments,setComments] = useState([])
  const [filter , setFilter] = useState('Not Approved')

  const {axios} = useAppContext()

  const fetchComment = async()=>{
    
    try {
      
      const { data } = await axios.get('/api/admin/comments')

      data.success ?  setComments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
      
    }
  }
  
  useEffect(()=>{
    fetchComment()
  },[])
  
  return (
    <div className='flex flex-col w-full pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      {/* Header Section */}
      <div className="flex justify-between items-center w-full mb-4">
        <h1 className="text-2xl font-semibold">
          Comments
        </h1>
        <div className="flex gap-4">
          <button 
            onClick={()=>setFilter('Approved')} 
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs transition-colors ${
              filter === 'Approved' ? 'text-primary bg-primary/10' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Approved
          </button>
          <button 
            onClick={()=>setFilter('Not Approved')} 
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs transition-colors ${
              filter === 'Not Approved' ? 'text-primary bg-primary/10' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="relative h-4/5 w-full overflow-x-auto bg-white shadow rounded-lg scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className='text-xs text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>Blog Title & Comment</th>
              <th scope='col' className='px-6 py-3 max-sm:hidden'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.filter((comment) => {
              if(filter === 'Approved')
                return comment.isApproved === true
              return comment.isApproved === false
            }).map((comment, index) => 
              <CommentTable 
                key={comment._id} 
                comment={comment} 
                index={index + 1} 
                fetchComment={fetchComment}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}