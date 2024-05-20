import { Router } from 'express';
import userRoutes from './userRoutes.js'
import financeRoutes from './financeRoutes.js'
const appRouter = Router();

appRouter.use('/user', userRoutes);
appRouter.use('/financial-records', financeRoutes);

export default appRouter;