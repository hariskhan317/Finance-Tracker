import express from 'express';
import appRouter from './routes/index.js';
import { config } from 'dotenv';
const app = express();


config();
app.use(express.json());
app.use('/api/v1', appRouter);
export default app;