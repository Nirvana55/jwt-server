import User from '../model/signup';
import bcrypt from 'bcrypt';
import catchAsync from '../utils/catchAsync';
import { Request, Response } from 'express';
import { generateJwtToken } from '../utils/jwt';

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

	const token = generateJwtToken(createUser._id.toString(), '2h');

	// createUser.token = token;

	res.status(201).json({
		status: 'Success',
		message: 'Your account has been created',
	});
});
