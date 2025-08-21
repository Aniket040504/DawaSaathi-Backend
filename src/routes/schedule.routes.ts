import express from 'express';
import {protect} from '../middleware/auth'
import { morningTime, eveningTime, afternoonTime } from '../controller/timeSchedule.controller';

const router=express();

router.patch('/morning',protect, morningTime); // Schedule Morning Medicine Time
router.patch('/afternoon',protect,afternoonTime); // Schedule Afternoon Medicine Time
router.patch('/evening',protect,eveningTime); // Schedule Evening Medicine Time

export default router;
