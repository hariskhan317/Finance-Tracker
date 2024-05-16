import { Router } from 'express'
import { getUsers, userLogin, userSignin } from '../controllers/userControllers.js'
import { validate, loginValidator, signinValidator } from '../utils/validation.js';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.post('/signin',signinValidator(), validate, userSignin);
userRoutes.post('/login',loginValidator(), validate, userLogin);


export default userRoutes;