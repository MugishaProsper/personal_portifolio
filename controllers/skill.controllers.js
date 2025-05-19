import Skill from "../models/skill.model.js";
import { uploadImageToCloudinary } from "../utils/upload.image.js";

export const getAllSkill = async (req, res) => {
  try {
    const skills = await Skill.find();
    return res.status(200).json({ skills });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message : "Internal server error" });
  }
};

export const getSkill = async (req, res) => {
  const { skillId } = req.params;
  try {
    const skill = await Skill.findById(skillId);
    if(!skill){
      return res.status(404).json({ message : "No skill found" })
    }
    return res.status(200).json({ skill });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message : "Internal server error" });
  }
}

export const createSkill = async (req, res) => {
  const { skill_name, skill_percentage, years_of_experience, description } = req.body;
  try {
    const skill = await Skill.findOne({ skillName : skill_name });
    if(skill){
      return res.status(403).json({ message : "Skill already exists" })
    }
    const skillImage = await uploadImageToCloudinary(req.file.path, 'skill');
    const newSkill = new Skill({
      skillName : skill_name,
      skillPercentage : skill_percentage,
      yearsOfExperience : years_of_experience,
      description : description,
      skillImage : skillImage.url
    })
    await newSkill.save();
    return res.status(200).json({ message : "Skill created" })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message : "Internal server error" });
  }
};

export const updateSkill = async (req, res) => {
  const { skillId } = req.params;
  const { skill_name, skill_percentage, years_of_experience, description } = req.body;
  try {
    const skill = await Skill.findById(skillId);
    if(!skill){
      return res.status(404).json({ message : "No skill found" })
    }
    skill.skillName = skill_name;
    skill.skillPercentage = skill_percentage;
    skill.yearsOfExperience = years_of_experience;
    skill.description = description;
    if(req.file){
      const skillImage = await uploadImageToCloudinary(req.file.path, 'skill');
      skill.skillImage = skillImage.url;
    }
    await skill.save();
    return res.status(200).json({ message : "Skill updated" })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message : "Internal server error" });
  }
}

export const deleteSkill = async (req, res) => {
  const { skillId } = req.params;
  try {
    const skill = await Skill.findById(skillId);  
    if(!skill){
      return res.status(404).json({ message : "No skill found" })
    }
    await Skill.findByIdAndDelete(skillId);
    return res.status(200).json({ message : "Skill deleted" })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message : "Internal server error" });
  }
}
