import express from 'express';
import AuthRouter from './route/auth';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
	path: path.resolve(process.cwd(), '.env'),
});

const app = express();

app.use(express.json());

app.use('/api/auth', AuthRouter);

export default app;
