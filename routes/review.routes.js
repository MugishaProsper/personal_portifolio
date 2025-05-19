import { Router } from "express";
import {
  getProjectReviews,
  getBlogReviews,
  addProjectReview,
  addBlogReview
} from "../controllers/review.controllers.js";
import { validateReview, handleValidationErrors } from "../middlewares/validation.middleware.js";

const reviewRouter = Router();

// Project review routes
reviewRouter.get("/project/:projectId", getProjectReviews);
reviewRouter.post("/project/:projectId", validateReview, handleValidationErrors, addProjectReview);

// Blog review routes
reviewRouter.get("/blog/:blogId", getBlogReviews);
reviewRouter.post("/blog/:blogId", validateReview, handleValidationErrors, addBlogReview);

export default reviewRouter;
