import Joi from 'joi';

export const createPaymentValidation = Joi.object().keys({
	paymentMethodId: Joi.string().required(),
	billingDetails: Joi.object()
		.keys({
			name: Joi.string().required(),
			address: Joi.object()
				.keys({
					line1: Joi.string().required(),
					country: Joi.string().required(),
					city: Joi.string().required(),
					state: Joi.string().required(),
					postal_code: Joi.string().required()
				})
				.required()
		})
		.required(),
	amount: Joi.number().required()
});
