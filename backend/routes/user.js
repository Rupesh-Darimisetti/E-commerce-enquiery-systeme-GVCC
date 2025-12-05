import express from 'express';
import userConroller from '../controller/userController';
import { initalDBSetup } from '../db/db';
const userRouter = express.Router()

initalDBSetup()

userRouter.post('/register', userConroller.register)

userRouter.post('/login', userConroller.login)

export default userRouter