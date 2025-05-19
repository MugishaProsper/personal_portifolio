import Blog from "../models/blog.model.js";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order === 'asc' ? 1 : -1;
    const category = req.query.category;
    const search = req.query.search;

    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    if (category) {
      query.category = category;
    }
    if (search) {
      query.$text = { $search: search };
    }

    const blogs = await Blog.find(query)
      .sort({ [sort]: order })
      .skip(skip)
      .limit(limit)
      .select('-content'); // Don't send full content in list view

    const total = await Blog.countDocuments(query);

    return res.status(200).json({
      blogs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error in getAllBlogs:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBlog = async (req, res) => {
  const { blogId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({ message: "Invalid blog ID format" });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.views += 1;
    await blog.save();

    return res.status(200).json({ blog });
  } catch (error) {
    console.error('Error in getBlog:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createBlog = async (req, res) => {
  const { title, content, summary, cover_image, tags, category, reading_time } = req.body;

  try {
    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      return res.status(409).json({ message: "Blog with this title already exists" });
    }

    const newBlog = new Blog({
      title,
      content,
      summary,
      cover_image,
      tags,
      category,
      reading_time
    });

    await newBlog.save();
    return res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog
    });
  } catch (error) {
    console.error('Error in createBlog:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateBlog = async (req, res) => {
  const { blogId } = req.params;
  const { title, content, summary, cover_image, tags, category, reading_time } = req.body;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({ message: "Invalid blog ID format" });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        content,
        summary,
        cover_image,
        tags,
        category,
        reading_time
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog
    });
  } catch (error) {
    console.error('Error in updateBlog:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteBlog = async (req, res) => {
  const { blogId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({ message: "Invalid blog ID format" });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await Blog.findByIdAndDelete(blogId);
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error('Error in deleteBlog:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const likeBlog = async (req, res) => {
  const { blogId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({ message: "Invalid blog ID format" });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.likes += 1;
    await blog.save();

    return res.status(200).json({
      message: "Blog liked successfully",
      likes: blog.likes
    });
  } catch (error) {
    console.error('Error in likeBlog:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchBlogs = async (req, res) => {
  const { query } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const skip = (page - 1) * limit;

    const blogs = await Blog.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(limit)
      .select('-content');

    const total = await Blog.countDocuments({ $text: { $search: query } });

    return res.status(200).json({
      blogs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error in searchBlogs:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}; 