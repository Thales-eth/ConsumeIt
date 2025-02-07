import { Router } from 'express';
import { sendMessageController } from '@controllers/telegram.controller';

const router = Router();

router.post('/', sendMessageController);

export const TelegramRoute = {
	path: '/contact',
	router
};
