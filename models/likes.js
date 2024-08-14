import mongoose, { mongo } from "mongoose"


const likesSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    blog:{
        type:mongoose.Schema.ObjectId,
        ref:"Blog"
    },
    likedAt:{
        type:Date,
        default:Date.now
    }
})


export default mongoose.model("Like",likesSchema);