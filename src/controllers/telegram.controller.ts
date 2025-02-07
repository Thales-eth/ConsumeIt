import { NextFunction, Request, Response } from 'express';
import { sendTelegramMessage } from '@services/telegram.service';
import { telegramMessageValidation } from '@validations/telegram.validation';

export const sendMessageController = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { email, name, message, topicId } = await telegramMessageValidation.validateAsync(
			req.body
		);

		await sendTelegramMessage({ email, name, message, topicId });

		res.status(200).json({ message: 'Message sent successfully' });
	} catch (error) {
		next(error);
	}
};
