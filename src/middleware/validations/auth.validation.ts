import { body } from 'express-validator';
import User from '../../model/signup';

export const registerUserValidation = [
	body('firstName').isString(),
	body('email')
		.isEmail()
		.custom(async (value) => {
			const findUser = await User.findOne(value);
			if (findUser) {
				throw 'Email is already taken';
			}
		}),
	body('lastName').isString(),
	body('address').isString(),
	body('password').isString().isStrongPassword(),
	body('confirmPassword').custom(async (value, { req }) => {
		if (value !== req.body.password) {
			console.log('hello');
			throw 'Please match the password';
		}
	}),
];
