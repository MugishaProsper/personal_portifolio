import User from "../models/user.model.js";
import { uploadImageToCloudinary } from "../utils/upload.image.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  }catch(error){
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const profile_image = await uploadImageToCloudinary(req.file.path, 'profile_images');
    const user = await User.create({ name, email, password, profile_image: profile_image.url });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, password } = req.body;
  try {
    const profile_image = await uploadImageToCloudinary(req.file.path, 'profile_images');
    const user = await User.findByIdAndUpdate(userId, { name, email, password, profile_image: profile_image.url }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}




