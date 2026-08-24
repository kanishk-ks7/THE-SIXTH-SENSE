import { Router } from 'express';
import { getSports, getSportById, getDifficulties } from '../controllers/sportController.js';

const router = Router();

router.get('/sports', getSports);
router.get('/sports/:id', getSportById);
router.get('/difficulties', getDifficulties);

export default router;
