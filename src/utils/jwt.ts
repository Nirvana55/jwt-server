import jwt from 'jsonwebtoken';

export const generateJwtToken = (userId: string, expiresIn: string) => {
	if (process.env.JWT_TOKEN) {
		return jwt.sign({ userId }, process.env.JWT_TOKEN, {
			expiresIn: expiresIn,
		});
	}
};

export const verifyJwtToken = (token: string) => {
	if (process.env.JWT_TOKEN) {
		return jwt.verify(token, process.env.JWT_TOKEN);
	}
};
