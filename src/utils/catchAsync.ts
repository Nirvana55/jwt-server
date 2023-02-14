import { Request, Response, NextFunction } from 'express';

type func = (req: Request, res: Response, next: NextFunction) => Promise<any>;

// HOF
const catchAsync =
	(fn: func) => (req: Request, res: Response, next: NextFunction) => {
		// returns an function it acts as middleware and catches error and display error
		fn(req, res, next).catch((error) => {
			res.status(500).json({
				status: 'Error',
				message: error.message,
			});
		});
	};

export default catchAsync;
