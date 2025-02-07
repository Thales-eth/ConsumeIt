import {
	deleteUserController,
	getDBUserController,
	updateUserController
} from '@controllers/user.controller';
import express from 'express';
import { tokenValidation } from '@middleware/tokenValidation.middleware';
const router = express.Router();

router.get('/', getDBUserController);
router.put('/', updateUserController);
router.delete('/', deleteUserController);

export const UserRoute = {
	path: '/user',
	router,
	middlewares: [tokenValidation]
};
