import Blogs from "../models/blogModel.js"


const Recomendations=async (category,id)=>{
    const recomendations=await Blogs.find({category,_id:{$ne:id}}).sort({createdat:-1}).limit(7)
    return recomendations
}

export default Recomendations