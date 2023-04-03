import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import User from '../../model/auth';
import catchAsync from '../../utils/catchAsync';
import { verifyJwtToken } from '../../utils/jwt';

export const protectRoute = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { jwt: token } = req.cookies;

		if (!token) {
			res.status(401).json({
				message: 'You are not logged ',
			});
		}

		if (token) {
			const user = verifyJwtToken(token) as JwtPayload;

			const findUser = await User.findOne(user._id);

			if (!findUser) {
				res.status(404).json({
					message: 'User not found',
				});
			}
			(req as any).user = findUser;
			next();
		}
	}
);
