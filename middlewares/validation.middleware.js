import { body, param, query, validationResult } from 'express-validator';

// Project validation middleware
export const validateProject = [
  body('project_name')
    .trim()
    .notEmpty()
    .withMessage('Project name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Project name must be between 3 and 100 characters'),

  body('project_link')
    .trim()
    .notEmpty()
    .withMessage('Project link is required')
    .isURL()
    .withMessage('Invalid project URL'),

  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),

  body('project_image')
    .trim()
    .notEmpty()
    .withMessage('Project image is required')
    .isURL()
    .withMessage('Invalid image URL'),

  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
];

// ID validation middleware
export const validateId = [
  param('projectId')
    .isMongoId()
    .withMessage('Invalid project ID format'),
];

// Query validation middleware
export const validateQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),

  query('sort')
    .optional()
    .isIn(['views', 'likes', 'rating', 'createdAt'])
    .withMessage('Invalid sort field'),

  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Order must be either asc or desc'),
];

// Review validation middleware
export const validateReview = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),

  body('review')
    .trim()
    .notEmpty()
    .withMessage('Review text is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Review must be between 10 and 1000 characters')
];

// Blog validation middleware
export const validateBlog = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 50 })
    .withMessage('Content must be at least 50 characters long'),

  body('summary')
    .trim()
    .notEmpty()
    .withMessage('Summary is required')
    .isLength({ max: 500 })
    .withMessage('Summary cannot exceed 500 characters'),

  body('cover_image')
    .trim()
    .notEmpty()
    .withMessage('Cover image is required')
    .isURL()
    .withMessage('Invalid image URL'),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),

  body('category')
    .optional()
    .isIn(['Technical', 'Project Update', 'Industry Insight', 'Tutorial', 'Opinion'])
    .withMessage('Invalid category'),

  body('reading_time')
    .notEmpty()
    .withMessage('Reading time is required')
    .isInt({ min: 1 })
    .withMessage('Reading time must be at least 1 minute')
];

// Validation result handler
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}; 