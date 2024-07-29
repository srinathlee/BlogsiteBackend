import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter  Username"],
    maxlength: [40, "username should not exceed morethan 40 characters"],
    minlength: [4, "username should not be lessthan 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter User Email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email"],
  },
  number: {
    type: Number,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v.toString());
      },
      message: (props) => `${props.value} is not a valid 10-digit number!`,
    },
    required: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter User Password"],
    minlength: [8, "password should be greaterthan 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },

  myBlogs: [
    {
      blog: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    },
  ],
  savedBlogs: [
    {
      blog: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    },
  ],
  likedBlogs: [
    {
      blog: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    },
  ]
});

export default mongoose.model("User", userSchema);
