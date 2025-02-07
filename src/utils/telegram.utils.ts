import { TELEGRAM_TOPIC_NAMES } from '@constants/telegram.constants';

export const getTelegramTopicName = (topicId: number): string => {
	return TELEGRAM_TOPIC_NAMES[topicId] ?? TELEGRAM_TOPIC_NAMES.default;
};
