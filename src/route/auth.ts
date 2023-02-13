import express from 'express';
import { signUpUser, welcomeUser } from '../controller/auth.controller';
import { protectRoute } from '../middleware/common/protectRoute';
import { registerUserValidation } from '../middleware/validations/auth.validation';

const router = express.Router();

router.post('/register', registerUserValidation, signUpUser);

router.use(protectRoute);

router.get('/welcome', welcomeUser);

export default router;
