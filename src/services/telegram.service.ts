import axios from 'axios';
import { BaseError } from '@errors/base.error';
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '@constants/env.constants';
import { getTelegramTopicName } from '@utils/telegram.utils';
import { ITelegramMessage } from '@interfaces/telegram.interface';

if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
	throw new Error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not defined');
}

const telegramInstance = axios.create({
	baseURL: `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`
});

export const sendTelegramMessage = async ({
	email,
	name,
	message,
	topicId
}: ITelegramMessage): Promise<void> => {
	try {
		const topic = getTelegramTopicName(topicId);
		const text = `🔔 New Message\n👤 From: ${name}\n📧 Email: ${email}\n📝 Topic: ${topic}\n💬 Message: ${message}`;

		await telegramInstance.post('/sendMessage', {
			chat_id: TELEGRAM_CHAT_ID,
			text,
			parse_mode: 'HTML',
			message_thread_id: topicId
		});
	} catch (error) {
		throw new BaseError('Failed to send telegram message', 500);
	}
};
