import { Router } from 'express'
// import { verifyToken } from '../utils/tokenManager.js'
import { getUsers, userLogin, userSignup } from '../controllers/userControllers.js'
import { validate, loginValidator, signupValidator } from '../utils/validation.js';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.post('/signup',signupValidator(), validate, userSignup);
userRoutes.post('/login',loginValidator(), validate, userLogin);


export default userRoutes;