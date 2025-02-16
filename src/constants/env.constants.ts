export const PORT = process.env.PORT || 3001;
export const ORIGIN = process.env.ORIGIN;

export const DATABASEURL =
	(process.env.NODE_ENV === 'development'
		? process.env.DATABASE_DEV_URL
		: process.env.DATABASE_PROD_URL) || 'postgresql://postgres:postgres@localhost:5432/development';

export const KEY = process.env.KEY;
export const IV_LENGTH = Number(process.env.IV_LENGTH);
export const ALGORITHM = process.env.ALGORITHM;

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
export const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;
