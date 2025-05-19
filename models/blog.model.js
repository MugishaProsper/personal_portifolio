import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: [50, 'Content must be at least 50 characters long']
  },
  summary: {
    type: String,
    required: true,
    trim: true,
    maxlength: [500, 'Summary cannot exceed 500 characters']
  },
  cover_image: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['Technical', 'Project Update', 'Industry Insight', 'Tutorial', 'Opinion'],
    default: 'Technical'
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  reading_time: {
    type: Number,
    required: true,
    min: [1, 'Reading time must be at least 1 minute']
  }
}, {
  timestamps: true
});

// Add text index for search functionality
blogSchema.index({ title: 'text', content: 'text', summary: 'text', tags: 'text' });

const Blog = mongoose.model("blogs", blogSchema);

export default Blog; 