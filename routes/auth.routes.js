import express from 'express';
import { login } from '../controllers/auth.controllers.js';

const auth_router = express.Router();

auth_router.post('/login', login);

export default auth_router;