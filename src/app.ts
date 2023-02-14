import express from 'express';
import AuthRouter from './route/auth.route';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';

dotenv.config({
	path: path.resolve(process.cwd(), '.env'),
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', AuthRouter);

export default app;
