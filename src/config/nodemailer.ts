import { EMAIL_PASS, EMAIL_USER } from '@constants/env.constants';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASS
	}
});
