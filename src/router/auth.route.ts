import express from 'express';
import { signUpController } from '@controllers/auth.controller';

const router = express.Router();

router.post('/signup', signUpController);

export const AuthRoute = { path: '/auth', router };
