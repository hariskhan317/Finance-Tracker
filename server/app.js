import express from 'express';
import appRouter from './routes/index.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();


// for deploying vercel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)
app.use(express.static(path.join(__dirname, '/client/dist')));
// render client for any path
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/client/dist')))


config();
// app.use(cors({
//     origin: ["https://finance-tracker-plum.vercel.app"],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     credentials: true
// }));

// app.use(cors({
//     origin: ["http://localhost:5173"],
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     credentials: true
// }));

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use('/api/v1', appRouter);
export default app;