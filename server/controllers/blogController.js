import fs from "fs/promises";
import imageKit from "../config/ImageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main  from "../config/gemini.js"

export const addBlog = async (req, res) => {
    try {
        const { title, subtitle, description, category, isPublished } = JSON.parse(req.body.blog); // ✅ Changed subTitle to subtitle

        const imageFile = req.file;
        if (!title || !description || !category || !imageFile) {
            return res.json({ success: false, message: "Missing required fields" });
        }

        // Read file as buffer
        const fileBuffer = await fs.readFile(imageFile.path);

        // Upload image to imagekit
        const response = await imageKit.upload({
            file: fileBuffer.toString('base64'), // ✅ Convert buffer to base64 string
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        // Clean up temporary file
        await fs.unlink(imageFile.path); // ✅ Delete temp file after upload

        // Optimized url imagekit
        const optimizedImageURL = imageKit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: '1280' }
            ]
        });

        const image = optimizedImageURL;

        await Blog.create({
            title,
            subtitle, // ✅ Changed from subTitle
            description,
            category,
            image,
            isPublished
        });

        res.json({
            success: true,
            message: "Blog Added Successfully"
        });
    } catch (error) {
        console.error("Blog creation error:", error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const getAllBlogs = async(req,res)=>{
    try {
        const blogs = await Blog.find({isPublished:true}).sort({createdAt: -1}) // ✅ Added sorting
        res.json({success:true , blogs})
        
    } catch (error) {
          res.json({success:false , message:error.message})
    }
}

export const getBlogById = async(req,res)=>{
    try {
        const {blogId} = req.params
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({success:false , message:"Blog Not Found !"})
        }
        res.json({success:true,blog})
        
    } catch (error) {
        res.json({success:false , message:error.message})
    }
}

export const deleteBlogById = async(req,res)=>{
    try {
        const {id} = req.body
        await Blog.findByIdAndDelete(id)
        
        // Delete all comments related to this blog
        await Comment.deleteMany({blog: id}) // ✅ Added this
        
        res.json({success:true,message:"Blog deleted successfully !"})
        
    } catch (error) {
        res.json({success:false , message:error.message})
    }
}

export const togglePublish = async(req,res)=>{
    try {
        const {id} = req.body
        const blog = await Blog.findById(id)
        if (!blog) {
            return res.json({ success: false, message: "Blog not found!" })
        }
        blog.isPublished = !blog.isPublished
        await blog.save()
        
        res.json({success:true,message:"Blog status updated !"})
        
    } catch (error) {
        res.json({success:false , message:error.message})
    }
}

export const addComment = async(req,res)=>{
    try {
        const {blog,name,content} = req.body
        await Comment.create({
            blog , name , content 
        })

        res.json({success: true , message:"Comment added for review "})

    } catch (error) {
        res.json({success:false , message:error.message})
    }
}

export const getBlogComments = async(req,res)=>{
    try {
        const {blogId} = req.body
        const comments = await Comment.find({blog:blogId, isApproved:true}).sort({createdAt: -1}) // ✅ Fixed syntax

        res.json({success:true , comments})
    } catch (error) {
        res.json({success:false , message:error.message})
    }
}



export const generateContent= async(req,res)=>{


    try {
        const  {prompt} = req.body
        const content =  await main(prompt + " Generate a blog content for this topic in simple  text format ")

        res.json({success:true , content})
    } catch (error) {
        res.json({success:false , message:error.message})
    }
}