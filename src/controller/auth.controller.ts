import User from '../model/auth';
import bcrypt from 'bcrypt';
import catchAsync from '../utils/catchAsync';
import { Request, Response } from 'express';
import { generateJwtToken } from '../utils/jwt';

export const sendTokenAsCookie = async (
	req: Request,
	res: Response,
	id: string
) => {
	if (process.env.JWT_EXPIRES) {
		const token = generateJwtToken(id, process.env.JWT_EXPIRES);
		res.cookie('jwt', token, {
			httpOnly: true,
			secure: req.headers['user-agent']?.startsWith('Postman') ? false : true,
			sameSite: 'none',
		});
	}
};

export const getUserSession = catchAsync(
	async (req: Request, res: Response) => {
		const user = (req as any).user;

		res.status(200).json({
			status: 'Success',
			message: 'User session fetched successfully',
			data: {
				isAuthenticated: user.isAuthenticated,
				name: `${user.firstName} ${user.lastName}`,
			},
		});
	}
);

export const signUpUser = catchAsync(async (req: Request, res: Response) => {
	const { firstName, email, lastName, address, password } = req.body;

	const encryptPassword = await bcrypt.hash(password, 10);

	const createUser = await User.create({
		firstName: firstName,
		lastName: lastName,
		email: email,
		address: address,
		password: encryptPassword,
		confirmPassword: encryptPassword,
	});

	sendTokenAsCookie(req, res, createUser._id.toString());

	await User.updateOne({
		isAuthenticated: true,
	});

	res.status(201).json({
		status: 'Success',
		message: 'Your account has been created',
	});
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
	const { password } = req.body;

	const isValidatePassword = await bcrypt.compare(
		password,
		(req as any).user.password
	);

	if (!isValidatePassword) {
		throw new Error('Password is not valid');
	}
	sendTokenAsCookie(req, res, (req as any)._id);

	await User.updateOne({
		isAuthenticated: true,
	});

	res.status(200).json({
		status: 'Success',
		message: 'You have successfully logged in',
	});
});

export const logoutUser = catchAsync(async (req: Request, res: Response) => {
	res.clearCookie('jwt');

	await User.updateOne({
		isAuthenticated: false,
	});

	res.status(200).json({
		status: 'Success',
		message: 'You have successfully logged out',
	});
});

export const welcomeUser = catchAsync(async (req: Request, res: Response) => {
	res.status(200).json({
		message: 'You are welcomed',
	});
});
