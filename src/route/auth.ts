import express from 'express';
import { signUpUser, welcomeUser } from '../controller/auth.controller';
import { protectRoute } from '../middleware/common/protectRoute';
import { registerUserValidation } from '../middleware/validations/auth.validation';

const router = express();

router.use(protectRoute);

router.post('/register', registerUserValidation, signUpUser);

router.get('/welcome', welcomeUser);

export default router;
