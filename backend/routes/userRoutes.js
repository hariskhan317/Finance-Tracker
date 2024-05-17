import { Router } from 'express'
import { verifyToken } from '../utils/tokenManager.js'
import { getUsers, userLogin, userSignup, userAuthStatus} from '../controllers/userControllers.js'
import { validate, loginValidator, signupValidator } from '../utils/validation.js'; 

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/auth-status',verifyToken, userAuthStatus);
userRoutes.post('/signup', signupValidator(), validate, userSignup);
userRoutes.post('/login',loginValidator(), validate, userLogin);


export default userRoutes;