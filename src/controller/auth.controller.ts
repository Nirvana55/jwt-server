import User from '../model/signup';
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
		});
	}
};

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

	res.status(201).json({
		status: 'Success',
		message: 'Your account has been created',
	});
});

export const welcomeUser = catchAsync(async (req: Request, res: Response) => {
	res.status(200).json({
		message: 'You are welcomed',
	});
});
