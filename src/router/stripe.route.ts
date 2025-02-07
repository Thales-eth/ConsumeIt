import express from 'express';
import { getProductsController, processPaymentController } from '@controllers/stripe.controller';
import { tokenValidation } from '@middleware/tokenValidation.middleware';

const router = express.Router();

router.get('/products', getProductsController);
router.post('/payment', tokenValidation, processPaymentController);

export const StripeRoute = {
	path: '/stripe',
	router
};
