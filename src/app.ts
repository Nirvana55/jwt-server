import express from 'express';
import AuthRouter from './route/auth.route';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config({
	path: path.resolve(process.cwd(), '.env'),
});

const app = express();

app.use(
	cors({
		origin: 'http://127.0.0.1:5173',
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', AuthRouter);

export default app;
