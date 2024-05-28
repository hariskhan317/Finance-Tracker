import express from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import appRouter from './routes/index.js';
import {mongooseConnection} from './database/index.js'
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


mongooseConnection()
    .then(() => console.log('Connected successfully'))
    .catch((error) => console.log("Can't connect", error))

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    try {
        console.log(`listening to port ${PORT}`);
    }catch (error) {
        console.log(error);
    }
})
