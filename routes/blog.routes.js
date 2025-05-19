import express from 'express';
import {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  searchBlogs
} from '../controllers/blog.controllers.js';
import { authorize } from '../middlewares/auth.middleware.js';
import { validateBlog, validateId, validateQuery, handleValidationErrors } from '../middlewares/validation.middleware.js';
import { apiLimiter, blogCreationLimiter } from '../middlewares/rateLimit.middleware.js';

const blog_router = express.Router();

// Apply rate limiting to all routes
blog_router.use(apiLimiter);

// Public routes
blog_router.get('/', validateQuery, handleValidationErrors, getAllBlogs);
blog_router.get('/search', validateQuery, handleValidationErrors, searchBlogs);
blog_router.get('/:blogId', validateId, handleValidationErrors, getBlog);
blog_router.post('/:blogId/like', validateId, handleValidationErrors, likeBlog);

// Protected routes (admin only)
blog_router.post('/',
  authorize,
  blogCreationLimiter,
  validateBlog,
  handleValidationErrors,
  createBlog
);

blog_router.put('/:blogId',
  authorize,
  validateId,
  validateBlog,
  handleValidationErrors,
  updateBlog
);

blog_router.delete('/:blogId',
  authorize,
  validateId,
  handleValidationErrors,
  deleteBlog
);

export default blog_router; 