import React, { useEffect, useState } from "react";
import { blog_data } from "../../assets/assets";
import BlogTableItem from "../../Components/admin/BlogTableItem";
import assets from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export default function ListBlog() {
  const [blogs, setBlogs] = useState([]);

  const {axios} = useAppContext()

  const fetchBlogs = async () => {
   
    try {
      const {data} =await  axios.get('/api/admin/blogs')

      if(data.success){
        setBlogs(data.blogs)
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
           toast.error(error.message)

    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    // Main container with full height
    <div className="flex-1 h-screen flex flex-col pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1 className="mb-4 flex-shrink-0">All Blogs</h1>

      {/* Content container that takes remaining space */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="flex items-start gap-3 mt-6 text-gray-600 h-full">
          <div className="relative max-w-4xl w-full h-full shadow rounded-lg bg-white flex flex-col">
            
            {/* Table container with defined max height and scroll */}
            <div className="flex-1 min-h-0 max-h-full overflow-auto">
              <table className="min-w-full table-auto text-sm text-gray-500">
                <thead className="text-xs text-gray-600 text-left uppercase bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-2 py-3 xl:px-6 border-b border-gray-200">#</th>
                    <th className="px-2 py-3 border-b border-gray-200">Blog Title</th>
                    <th className="px-2 py-3 max-sm:hidden border-b border-gray-200">Date</th>
                    <th className="px-2 py-3 max-sm:hidden border-b border-gray-200">Status</th>
                    <th className="px-2 py-3 border-b border-gray-200">Action</th>
                  </tr>
                </thead>

                <tbody> 
                  {blogs.map((b, i) => (
                    <BlogTableItem
                      key={b._id}
                      blog={b}
                      fetchBlogs={fetchBlogs}
                      index={i + 1}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}