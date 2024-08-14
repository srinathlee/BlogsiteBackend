import User from "../models/userModel.js";
import Blog from "../models/blogModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import e from "express";


//user register _________________________________________________________________

export const Register = async (req, res) => {
  const { name, email, password, number } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user == null) {
      const hasedpassword = await bcrypt.hash(password, 10);
      const newuser = { name, email, password: hasedpassword, number };
      const user = await User.create(newuser);
      const payload={email,id:user.id}
      const jwtToken=jwt.sign(payload,"jadlfkjasdlkfjaslkdflakjsfl")
      res.status(200).send({ message: "user registered successfully",jwtToken});
    } else {    
      res.status(403).send({ error: "user already exists" });
    }
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

//user login _________________________________________________________________

export const Login = async (req, res, next) => {
  const { email, password } = req.body;

  if (email == "" || password == "") {
    // return next(new errorHandler("Enter Email and Password", 403));
    return res.status(403).json({ message: "Enter Email and Password" });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    // return next(new errorHandler("Invalid Email or Password", 403));
    return res.status(403).json({ message: "Invalid Email or Password" });
  }
  //conparing password
  // const passwordMatch = await user.comparePassword(password);
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    // return next(new errorHandler("Invalid Email or Password", 403));
    return res.status(403).json({ message: "Invalie Email or Password" });
  }
  //sending response
  // sendJwt(user, 200,"login successfully", res);
  const payload={email,id:user.id}
  const jwtToken=jwt.sign(payload,"jadlfkjasdlkfjaslkdflakjsfl")
  return res.status(200).json({ message: "Login successfull",jwtToken ,user});
};

// my details______________________
export const userDetails=async(req,res,next)=>{
  const user=await User.findById(req.user.id)
  const blogs=await Blog.find({createdBy:user.id})
  console.log(blogs)
  if(!user){
    return next(new errorHandler("Login to access this resource",400))
  }
  res.status(200).send({success:true,user,blogs})
};

export const userUpdate = async (req, res) => {
  try {
    const id = req.user.id; // Assumes user ID is provided in req.user
    const data = req.body; // The updated user data
    console.log(data)

    // Update the user document in the database
    const updatedUser = await User.findByIdAndUpdate(id, { ...data }, { new: true });

    if (!updatedUser) {
      // User not found
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the updated user data
    res.status(200).json(updatedUser);
  } catch (error) {
    // Handle errors
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




// Follow or unfollow a user
export const updateFollowing = async (req, res) => {
  try {
    const  userId = req.user._id;
    const { userIdToUpdate, action } = req.body; // action: 'follow' or 'unfollow'
    console.log(action)

    if (action !== 'follow' && action !== 'unfollow') {
      return res.status(400).json({ message: 'Invalid action' });
    }

    const user = await User.findById(userId);
    const userToUpdate = await User.findById(userIdToUpdate);
    //console.log(user,userToUpdate)

    if (!user || !userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (action === 'follow') {
      // console.log(user.following)
      if (user.following.includes(userIdToUpdate)) {
        return res.status(400).json({ message: 'Already following this user' });
      }

      // Add to following list
      user.following.push(userIdToUpdate);
      await user.save();

      // Add to followers list
      userToUpdate.followers.push(userId);
      await userToUpdate.save();

      return res.status(200).json({ message: 'User followed successfully' });
    }

    if (action === 'unfollow') {
      if (!user.following.includes(userIdToUpdate)) {
        return res.status(400).json({ message: 'Not following this user' });
      }

      // Remove from following list
      user.following = user.following.filter(id => id.toString() !== userIdToUpdate.toString());
      await user.save();

      // Remove from followers list
      userToUpdate.followers = userToUpdate.followers.filter(id => id.toString() !== userId.toString());
      await userToUpdate.save();

      return res.status(200).json({ message: 'User unfollowed successfully' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
