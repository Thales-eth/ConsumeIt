import Joi from 'joi';

export const idFirebaseValidation = Joi.string().alphanum().max(40);
