import mongoose  from "mongoose";

const Commentchema = new mongoose.Schema({
  blog : {type: mongoose.Schema.Types.ObjectId,ref:'blog',required : true},
  name : {type:String , required : true},
  content : {type:String , required : true },
  isApproved : {type:Boolean , required : false }
},{timestamps:true})

const Comment = mongoose.model('Comment',Commentchema)
export default Comment