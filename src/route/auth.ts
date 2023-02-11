import express from 'express';
import { signUpUser } from '../controller/auth.controller';
import { registerUserValidation } from '../middleware/validations/auth.validation';

const router = express();

router.post('/register', registerUserValidation, signUpUser);

export default router;
