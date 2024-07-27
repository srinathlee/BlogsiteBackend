import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


//user register _________________________________________________________________

export const Register = async (req, res) => {
  const { name, email, password, number } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user == null) {
      console.log("he");
      const hasedpassword = await bcrypt.hash(password, 10);
      const newuser = { name, email, password: hasedpassword, number };
      const user = await User.create(newuser);
      res.status(200).send({ message: "user registered successfully" });
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
  return res.status(200).json({ message: "Login successfull",jwtToken });
};

// my details______________________
export const userDetails=async(req,res,next)=>{
  const user=await User.findById(req.user.id)
  if(!user){
    return next(new errorHandler("Login to access this resource",400))
  }
  res.status(200).send({success:true,user})
};
