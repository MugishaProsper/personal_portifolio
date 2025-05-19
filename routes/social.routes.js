import express from 'express';
import { getAllSocials, getSocial, createSocial, updateSocial, deleteSocial } from '../controllers/social.controllers.js';
import { authorize } from '../middlewares/auth.middleware.js';

const social_router = express.Router();

social_router.get('/', getAllSocials);
social_router.get('/:socialId', getSocial);
social_router.post('/', authorize, createSocial);
social_router.put('/:socialId', authorize, updateSocial);
social_router.delete('/:socialId', authorize, deleteSocial);

export default social_router;



