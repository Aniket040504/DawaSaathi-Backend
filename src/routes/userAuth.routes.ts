import express, { Router } from 'express';
import {userSignup,userLogin,verifyOTP,forgotPassword,resetPassword} from '../controller/userAuth.controller';

const router=express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);
router.post('/verifyotp',verifyOTP);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
