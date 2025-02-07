import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createPaymentIntentService = async ({
	amount,
	currency,
	payment_method_types,
	payment_method_id,
	customer_id
}: {
	amount: number;
	currency: string;
	payment_method_types: string[];
	payment_method_id: string;
	customer_id: string;
}): Promise<Stripe.PaymentIntent> => {
	try {
		return await stripe.paymentIntents.create({
			amount,
			currency,
			payment_method_types,
			payment_method: payment_method_id,
			customer: customer_id,
			confirmation_method: 'automatic',
			confirm: true
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getProdructsService = async (): Promise<Stripe.ApiList<Stripe.Product>> => {
	const products = await stripe.products.list();
	return products;
};

export const createCustomerService = async ({
	name,
	email,
	paymentMethodId
}: {
	name: string;
	email: string;
	paymentMethodId: Stripe.PaymentMethod['id'];
}): Promise<Stripe.Customer> => {
	try {
		return await stripe.customers.create({
			name,
			email,
			payment_method: paymentMethodId
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getCustomerByIdService = async (
	customerId: string
): Promise<Stripe.Customer | null> => {
	const customer = await stripe.customers.retrieve(customerId);
	if (!customer || customer.deleted) {
		return null;
	}
	return customer;
};
