import Project from "../models/project.model.js";
import mongoose from "mongoose";

export const getAllProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const projects = await Project.find()
      .sort({ [sort]: order })
      .skip(skip)
      .limit(limit)
      .populate('user', 'fullName email');

    const total = await Project.countDocuments();

    return res.status(200).json({
      projects,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error in getAllProjects:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProject = async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Invalid project ID format" });
  }

  try {
    const project = await Project.findById(projectId)
      .populate('user', 'fullName email')
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'fullName'
        }
      });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.views += 1;
    await project.save();

    return res.status(200).json({ project });
  } catch (error) {
    console.error('Error in getProject:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProject = async (req, res) => {
  const { userId } = req.user;
  const { project_name, project_link, project_image, description } = req.body;

  try {
    const existingProject = await Project.findOne({ project_name });
    if (existingProject) {
      return res.status(409).json({ message: "Project with this name already exists" });
    }

    const newProject = new Project({
      project_name,
      project_link,
      project_image,
      description,
      user: userId
    });

    await newProject.save();
    return res.status(201).json({
      message: "Project created successfully",
      project: newProject
    });
  } catch (error) {
    console.error('Error in createProject:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProject = async (req, res) => {
  const { projectId } = req.params;
  const { project_name, project_link, project_image, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Invalid project ID format" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user owns the project
    if (project.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to update this project" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        project_name,
        project_link,
        project_image,
        description
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject
    });
  } catch (error) {
    console.error('Error in updateProject:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProject = async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Invalid project ID format" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if user owns the project
    if (project.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to delete this project" });
    }

    await Project.findByIdAndDelete(projectId);
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error('Error in deleteProject:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const likeProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "No project found" })
    }
    project.likes += 1;
    await Project.save();
    return res.status(200).json({ likes: project.likes })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" })
  }
};

export const rateProject = async (req, res) => {
  const { projectId } = req.params;
  const { rating } = req.body;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: "Invalid project ID format" });
  }

  if (rating < 0 || rating > 5) {
    return res.status(400).json({ message: "Rating must be between 0 and 5" });
  }

  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.rating = rating;
    await project.save();

    return res.status(200).json({
      message: "Project rated successfully",
      rating: project.rating
    });
  } catch (error) {
    console.error('Error in rateProject:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};