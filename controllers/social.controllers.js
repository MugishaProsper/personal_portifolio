import Social from "../models/social.model.js";
import { uploadImageToCloudinary } from "../utils/upload.image.js";

export const getAllSocials = async (req, res) => {
  try {
    const socials = await Social.find();
    res.status(200).json(socials);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getSocial = async (req, res) => {
  const { socialId } = req.params;
  try {
    const social = await Social.findById(socialId);
    res.status(200).json(social);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const createSocial = async (req, res) => {
  const { name, link, icon } = req.body;
  try {
    const social_image = await uploadImageToCloudinary(req.file.path, 'social_images');
    const social = await Social.create({ name, link, icon, image: social_image.url });
    res.status(201).json(social);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateSocial = async (req, res) => {
  const { socialId } = req.params;
  const { name, link, icon } = req.body;
  try {
    const social_image = await uploadImageToCloudinary(req.file.path, 'social_images');
    const social = await Social.findByIdAndUpdate(socialId, { name, link, icon, image: social_image.url }, { new: true });
    res.status(200).json(social);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteSocial = async (req, res) => {
  const { socialId } = req.params;
  try {
    await Social.findByIdAndDelete(socialId);
    res.status(200).json({ message: "Social deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


