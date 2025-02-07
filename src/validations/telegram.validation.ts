import Joi from 'joi';

export const telegramMessageValidation = Joi.object({
	email: Joi.string().email().required(),
	name: Joi.string().required(),
	message: Joi.string().required(),
	topicId: Joi.number().valid(1, 2, 3, 4).required()
});
