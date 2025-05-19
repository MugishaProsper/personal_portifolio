import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['project', 'blog']
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'projects'
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'blogs'
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  review: {
    type: String,
    required: true,
    trim: true,
    minlength: [10, 'Review must be at least 10 characters long'],
    maxlength: [1000, 'Review cannot exceed 1000 characters']
  },
  rating: {
    type: Number,
    required: true,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Add compound index for type and either projectId or blogId
reviewSchema.index({ type: 1, projectId: 1 });
reviewSchema.index({ type: 1, blogId: 1 });

const Review = mongoose.model("reviews", reviewSchema);

export default Review;
