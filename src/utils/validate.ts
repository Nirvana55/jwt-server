import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		// validate.run is an method which updates the req object and returns a promise
		await Promise.all(validations.map((validate) => validate.run(req)));

		// it checks the req object and throw an error
		const error = validationResult(req);

		if (error.isEmpty()) return next();
		res.status(422).json({
			message: error.array(),
		});
	};
};
