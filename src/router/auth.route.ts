import express from 'express';
import { sendAuthLinkController, signUpController } from '@controllers/auth.controller';

const router = express.Router();

router.post('/signup', signUpController);
router.post('/sendAuthLink', sendAuthLinkController);

export const AuthRoute = { path: '/auth', router };
