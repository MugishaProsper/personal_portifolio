import express from 'express';
import { getAllExperiences, getExperience, createExperience, updateExperience, deleteExperience } from '../controllers/experience.controllers.js';
import { authorize } from '../middlewares/auth.middleware.js';
const experience_router = express.Router();

experience_router.get('/', getAllExperiences);
experience_router.get('/:experienceId', getExperience);
experience_router.post('/', authorize, createExperience);
experience_router.put('/:experienceId', authorize, updateExperience);
experience_router.delete('/:experienceId', authorize, deleteExperience);

export default experience_router;
