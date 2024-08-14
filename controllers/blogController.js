import Blogs from "../models/blogModel.js";
import Recomendations from "../utils/recomendations.js";
import User from "../models/userModel.js";
import Like from "../models/likes.js";

// creating blog_________________________________

export const CreateBlog = async (req, res) => {
  const { title, content, category, image } = req.body;
  const createdBy = req.user.id;
  const creatorName = req.user.name;

  try {
    const blog = await Blogs.create({
      title,
      content,
      category,
      image,
      createdBy,
      creatorName,
    });
    res.status(201).json({ message: "blog created successfully" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

// get single blog_________________________________

export const GetBlog = async (req, res) => {
  const { id } = req.params;
  const {image,name,_id}=req.user
  const CreatorDetails={creatorImg:image,creatorName:name,creatorId:_id}
  try {
    const blog = await Blogs.findById(id);
    if (blog) {
      const category=blog.category
      const likes = await Like.find({ blog: id });
      const LikesCount = likes.length;
      const recomends = await Recomendations(category, id);
      res
        .status(200)
        .json({ blog, recomendations: recomends, likes, LikesCount,CreatorDetails });
    } else {
      res.status(403).json({ message: "no blog found" });
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

// get all blogs____________________________________

export const GetAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

// write or edit comments_____________________________

export const WriteComment = async (req, res) => {
  const { message } = req.body;
  const blogId = req.params.id;
  const { id, name } = req.user;
  const comment = {
    user: id,
    message,
    name,
  };
  try {
    const blog = await Blogs.findById(blogId);
    // checking weather user already wrote review or not________
    const isCommented = blog.comments.find((rev) => {
      return rev.user.toString() == req.user.id;
    });

    if (isCommented) {
      blog.comments.forEach((rev) => {
        if (rev.user.toString() === req.user.id) {
          rev.message = message;
        }
      });
    } else {
      blog.comments.push(comment);
    }
    // no of reviews calculation
    blog.noOfComments = blog.comments.length;
    await blog.save({ validateBeforeSave: false });
    res.status(200).json({ message: "comment successful" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

// save blogs________________________________

export const SaveBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    const isSaved = user.savedBlogs.find((each) => each.blog == blogId);
    console.log(isSaved);
    if (isSaved) {
      return res.status(200).json({ message: "already blog saved" });
    }
    user.savedBlogs.push({ blog: blogId });
    await user.save({ validateBeforeSave: false });
    return res.status(200).json({ message: "blog saved successfully" });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

// liking a blog______________________________
export const LikeBlog = async (req, res) => {
  console.log("entr into blog");
  const blogId = req.params.id;
  const userId = req.user.id;
  let message = "";
  try {
    let likes = await Like.findOne({
      $and: [{ user: userId }, { blog: blogId }],
    });
    if (likes) {
      const deleted = await Like.deleteOne({ _id: likes._id });
      console.log(deleted);
      message = "disliked";
    } else {
      likes = await Like.create({ user: userId, blog: blogId });
      message = "liked";
    }
    return res.status(200).json({ message, likes });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

export const userLikeBlogs = async (req, res) => {
  const userId = req.user.id;
  try {
    // Find liked blog IDs
    const likeEntries = await Like.find({ user: userId }, { blog: 1, _id: 0 });
    console.log(likeEntries);

    // Extract blog IDs
    const blogIds = likeEntries.map(entry => entry.blog);
    
    if (blogIds.length > 0) {
      // Find blogs by IDs
      const blogPromises = blogIds.map(id => Blogs.findById(id));
      const blogs = await Promise.all(blogPromises);
      console.log(blogs);
      
      return res.status(200).json({ message: "Liked blogs", blogs });
    }

    return res.status(200).json({ message: "No liked blogs found", blogs: [] });
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};
