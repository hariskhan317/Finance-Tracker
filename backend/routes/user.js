import { Router } from 'express'
import { getUsers } from '../controllers/userControllers.js'
import { validate, loginValidator, signinValidator } from '../utils/validation.js';

const userRoutes = Router();

userRoutes.get('/', getUsers);
// userRoutes.post('/signin', userSignin);
// userRoutes.get('/login', userLogin);

export default userRoutes;