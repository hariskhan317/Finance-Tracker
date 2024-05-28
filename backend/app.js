import express from 'express';
import appRouter from './routes/index.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors' 
const app = express();

config();

app.use(cors({
    origin: ["https://finance-tracker-frontend-omega.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use('/api/v1', appRouter);
export default app;
