import express from 'express';
import { getAllReachouts, getReachout, createReachout, updateReachout, deleteReachout } from '../controllers/reachout.controllers.js';

const reachout_router = express.Router();

reachout_router.get('/', getAllReachouts);
reachout_router.get('/:reachoutId', getReachout);
reachout_router.post('/', createReachout);
reachout_router.put('/:reachoutId', updateReachout);
reachout_router.delete('/:reachoutId', deleteReachout);

export default reachout_router;
