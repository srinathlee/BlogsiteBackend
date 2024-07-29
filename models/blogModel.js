import mongoose from "mongoose";

const blog = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter title of blog"],
  },
  content: {
    type: String,
    required: [true, "please enter content of blog"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "please provide category"],
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
  noOfReviews: {
    type: Number,
    default: 0,
  },
  noOfLikes: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdat: {
    type: Date,
    default: Date.now,
  },
});
