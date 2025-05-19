import Experience from "../models/experience.model.js";

export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getExperience = async (req, res) => {
  const { experienceId } = req.params;
  try {
    const experience = await Experience.findById(experienceId);
    res.status(200).json(experience);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const createExperience = async (req, res) => {
  const { company_name, role, start_date, end_date, description, image } = req.body;
  try {
    const experience = await Experience.create({ company_name, role, start_date, end_date, description, image });
    res.status(201).json(experience);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateExperience = async (req, res) => {
  const { experienceId } = req.params;
  const { company_name, role, start_date, end_date, description, image } = req.body;
  try {
    const experience = await Experience.findByIdAndUpdate(experienceId, { company_name, role, start_date, end_date, description, image }, { new: true });
    res.status(200).json(experience);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteExperience = async (req, res) => {
  const { experienceId } = req.params;
  try {
    await Experience.findByIdAndDelete(experienceId);
    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}








