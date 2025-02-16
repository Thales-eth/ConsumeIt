import { EMAIL_USER } from '@constants/env.constants';
import { transporter } from 'src/config/nodemailer';

export const sendAuthLinkEmail = async (email: string, link: string): Promise<void> => {
	const mailOptions = {
		from: EMAIL_USER,
		to: email,
		subject: 'Login to your account',
		html: `<p>Click <a href="${link}">here</a> to login to your account</p>`
	};

	await transporter.sendMail(mailOptions);
};
