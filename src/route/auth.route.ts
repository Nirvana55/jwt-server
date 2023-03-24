import express from 'express';
import {
	loginUser,
	signUpUser,
	welcomeUser,
	getUserSession,
} from '../controller/auth.controller';
import { protectRoute } from '../middleware/common/protectRoute';
import {
	loginValidation,
	registerUserValidation,
} from '../middleware/validations/auth.validation';
import { validate } from '../utils/validate';

const router = express.Router();

router.post('/register', validate(registerUserValidation), signUpUser);
router.post('/login', validate(loginValidation), loginUser);

router.use(protectRoute);

router.get('/check-user-session', getUserSession);
router.get('/welcome', welcomeUser);

export default router;
