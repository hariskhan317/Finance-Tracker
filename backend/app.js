import express from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import appRouter from './routes/index.js';
import { mongooseConnection } from './database/index.js';
import cors from 'cors';

const app = express();

config();

app.use(cors({
    origin: "https://finance-tracker-frontend-wine.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://finance-tracker-frontend-wine.vercel.app");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongooseConnection()
    .then(() => console.log('Connected successfully'))
    .catch((error) => console.log("Can't connect", error));

app.use('/api/v1', appRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    try {
        console.log(`Listening on port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
});
