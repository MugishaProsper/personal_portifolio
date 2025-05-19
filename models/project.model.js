import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  project_name: { type: String, required: true },
  project_link: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  description: { type: String, required: true },
  project_image: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
}, { timestamps: true });

const Project = mongoose.model('projects', projectSchema);

export default Project;