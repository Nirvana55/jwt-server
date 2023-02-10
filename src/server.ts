import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
	path: path.resolve(process.cwd(), '.env'),
});

export let db = '';

if (process.env.MONGOOSE_URI && process.env.MONGOOSE_PASSWORD) {
	db = process.env.MONGOOSE_URI?.replace(
		'<password>',
		process.env.MONGOOSE_PASSWORD
	);
}

mongoose.connect(db).then(() => console.log('database has connected'));

import app from './app';

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
	console.log(`port is running ${port}`);
});

process.on('uncaughtException', (err) => {
	console.log(err);
	console.log('Unhandled Rejection!! Shutting down the server');
	server.close(() => {
		process.exit(1);
	});
});
