import Review from '../models/review.model.js';

export const getProjectReviews = async (req, res) => {
  const { projectId } = req.params;
  try {
    const reviews = await Review.find({ projectId, type: 'project' });
    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found" })
    }
    return res.status(200).json({ reviews });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" })
  }
}

export const getBlogReviews = async (req, res) => {
  const { blogId } = req.params;
  try {
    const reviews = await Review.find({ blogId, type: 'blog' });
    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found" })
    }
    return res.status(200).json({ reviews });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" })
  }
}

export const addProjectReview = async (req, res) => {
  const { projectId } = req.params;
  const { email, review } = req.body;
  try {
    const new_review = new Review({
      projectId,
      email,
      review,
      type: 'project'
    });
    await new_review.save();
    return res.status(200).json({ message: "Review added successfully" })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" })
  }
};

export const addBlogReview = async (req, res) => {
  const { blogId } = req.params;
  const { email, review } = req.body;
  try {
    const new_review = new Review({
      blogId,
      email,
      review,
      type: 'blog'
    });
    await new_review.save();
    return res.status(200).json({ message: "Review added successfully" })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" })
  }
};



