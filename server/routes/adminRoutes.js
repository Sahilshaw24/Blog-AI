import express from 'express'
import auth from "../middlewares/auth.js"
import {adminLogin, approveCommentByID, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashBoard} from "../controllers/adminController.js"

const adminRouter = express.Router()

adminRouter.post('/login',adminLogin)
adminRouter.get("/comments",auth , getAllComments)
adminRouter.get("/blogs",auth , getAllBlogsAdmin)
adminRouter.post("/delete-comment",auth , deleteCommentById)
adminRouter.post("/approve-comment",auth , approveCommentByID)
adminRouter.get("/dashboard",auth , getDashBoard)


export default adminRouter