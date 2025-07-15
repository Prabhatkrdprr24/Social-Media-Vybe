import express from 'express';
import { getCurrentUser, getProfile, suggestedUsers } from '../controllers/user.controllers.js';
import isAuth from '../middlewares/isAuth.js';
import { upload } from '../middlewares/multer.js';
import { editProfile } from '../controllers/user.controllers.js';

const userRouter = express.Router();

userRouter.get('/current', isAuth, getCurrentUser);
userRouter.get('/suggested', isAuth, suggestedUsers);
userRouter.post('/editProfile', isAuth, upload.single("profileImage"), editProfile);
userRouter.get('/getProfile/:userName', isAuth, getProfile);

export default userRouter;