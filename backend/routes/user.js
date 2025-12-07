import express from 'express';
import userConroller from '../controller/userController.js';
import { initalDBSetup } from '../db/db.js';
const userRouter = express.Router()

initalDBSetup()

userRouter.post('/register', userConroller.register)

userRouter.post('/login', userConroller.login)

export default userRouter