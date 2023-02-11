import { Request, Response, NextFunction } from 'express';

type func = (req: Request, res: Response, next: NextFunction) => Promise<any>;

const catchAsync =
	(fn: func) => (req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch((error) => {
			res.status(500).json({
				status: 'Error',
				message: error.message,
			});
		});
	};

export default catchAsync;
