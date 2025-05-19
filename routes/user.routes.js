import express from 'express';
import { getAllUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/user.controllers.js';
import { authorize } from '../middlewares/auth.middleware.js';

const user_router = express.Router();

user_router.get('/', getAllUsers);
user_router.get('/:userId', getUser);
user_router.post('/', authorize, createUser);
user_router.put('/:userId', authorize, updateUser);
user_router.delete('/:userId', authorize, deleteUser);

export default user_router;
