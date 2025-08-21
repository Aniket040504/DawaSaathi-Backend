import express,{Router} from 'express';
import {updateProfile} from '../controller/profile.controller'
import {protect} from '../middleware/auth'
import {userName} from '../controller/dashBoard.controller';

const router=express.Router();

router.post('/updateProfile/:id',protect,updateProfile);
router.get('/name', protect,userName);

export default router;