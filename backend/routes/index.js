import { Router } from 'express';
import userRoutes from './user.js'
const appRouter = Router();

appRouter.use('/user', userRoutes);

export default appRouter;