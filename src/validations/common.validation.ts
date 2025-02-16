import Joi from 'joi';

export const idFirebaseValidation = Joi.string().alphanum().max(40);

export const EMAIL_VALIDATION = Joi.object({
	email: Joi.string().email().required()
});
