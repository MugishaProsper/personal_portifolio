import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/generate.token.js";

export const login = async (req,res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email : email });
    if(!user){
      return res.status(404).json({ message : "No such user found" })
    };
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(403).json({ message : "Invalid password" });
    };
    const token = generateToken(user);
    return res.status(200).json({ message : "Login successfull" })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message : "Internal Server error" })
  }
}