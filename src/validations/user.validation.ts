import { UserRole } from '@prisma/client';
import Joi from 'joi';

export const userCreationValidation = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required(),
	role: Joi.string()
		.valid(...Object.values(UserRole))
		.required(),
	username: Joi.string().optional()
});

export const userLoginValidation = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).required()
});

export const userUpdateValidation = Joi.object({
	role: Joi.string()
		.valid(...Object.values(UserRole))
		.optional(),
	email: Joi.string().email().optional(),
	username: Joi.string().optional()
});
