import express from 'express';
import appRouter from './routes/index.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();


config();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: "any",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1', appRouter);
export default app;