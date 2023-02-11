import mongoose from 'mongoose';

interface SignUp {
	firstName: string;
	lastName: string;
	address: string;
	password: string;
	confirmPassword: string;
	email: string;
	token?: string;
}

const signUpSchema = new mongoose.Schema<SignUp>({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	confirmPassword: {
		type: String,
		required: true,
	},
	token: {
		type: String,
	},
});

const User = mongoose.model('User', signUpSchema);

export default User;
