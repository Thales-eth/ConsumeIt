import { NextFunction, Request, Response } from 'express';
import {
	createPaymentIntentService,
	getProdructsService,
	createCustomerService,
	getCustomerByIdService
} from '@services/stripe.service';
import { createPaymentValidation } from '@validations/stripe.validation';
import { BaseError } from '@errors/base.error';
import { DEFAULT_CURRENCY } from '@constants/index';
import { findUserCustomerId, updateDBUserCustomerId } from '@repositories/user.repository';
import { encrypt, decrypt } from '@utils/crypto.utils';

export const getProductsController = async (
	_: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const products = await getProdructsService();
		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
};

export const processPaymentController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { paymentMethodId, billingDetails, amount } = await createPaymentValidation.validateAsync(
			req.body
		);
		const { _id, email } = req.user;

		const customerId = await findUserCustomerId(_id);
		if (!customerId) {
			throw new BaseError('User not found', 404);
		}

		if (!billingDetails.name || !email) {
			throw new BaseError('Name and email are required', 400);
		}

		const decryptedCustomerId = (customerId && decrypt(customerId)) || null;

		let customer =
			(decryptedCustomerId && (await getCustomerByIdService(decryptedCustomerId))) || null;

		if (!customer) {
			customer = await createCustomerService({
				name: billingDetails.name,
				email,
				paymentMethodId
			});
			const encryptedCustomerId = encrypt(customer.id);
			await updateDBUserCustomerId(_id, encryptedCustomerId);
		}

		await createPaymentIntentService({
			amount,
			currency: DEFAULT_CURRENCY,
			payment_method_types: ['card'],
			payment_method_id: paymentMethodId,
			customer_id: customer.id
		});

		res.status(200).json('Payment successful');
	} catch (error) {
		next(error);
	}
};
