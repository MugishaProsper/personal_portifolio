import express from 'express';
import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  rateProject
} from '../controllers/project.controllers.js';
import { authorize } from '../middlewares/auth.middleware.js';
import {
  validateProject,
  validateId,
  validateQuery,
  validateReview,
  handleValidationErrors
} from '../middlewares/validation.middleware.js';
import { apiLimiter, projectCreationLimiter } from '../middlewares/rateLimit.middleware.js';

const project_router = express.Router();

// Apply rate limiting to all routes
project_router.use(apiLimiter);

// Public routes
project_router.get('/', validateQuery, handleValidationErrors, getAllProjects);
project_router.get('/:projectId', validateId, handleValidationErrors, getProject);

// Protected routes
project_router.post('/',
  authorize,
  projectCreationLimiter,
  validateProject,
  handleValidationErrors,
  createProject
);

project_router.put('/:projectId',
  authorize,
  validateId,
  validateProject,
  handleValidationErrors,
  updateProject
);

project_router.delete('/:projectId',
  authorize,
  validateId,
  handleValidationErrors,
  deleteProject
);

// Rating and review routes
project_router.post('/:projectId/rate',
  authorize,
  validateId,
  validateReview,
  handleValidationErrors,
  rateProject
);

export default project_router;

