import { NextFunction, Request, Response } from 'express';
import { createDBUser, findDBUserByEmail } from '@repositories/user.repository';
import { UserRole } from '@prisma/client';
import { BaseError } from '@errors/base.error';
import { setCustomClaims, validateToken } from '@services/firebase.service';
import { EMAIL_VALIDATION } from '@validations/firebase.validation';
import { sendAuthLinkEmail } from '@services/nodemailer.service';

export const signUpController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { idToken } = req.body;

		const decodedToken = await validateToken(idToken);

		if (!decodedToken.email) {
			throw new BaseError('Invalid token', 401);
		}

		let user = await findDBUserByEmail(decodedToken.email);

		if (!user) {
			user = await createDBUser({
				email: decodedToken.email!,
				firebaseId: decodedToken.uid,
				role: UserRole.FREE_USER
			});

			await setCustomClaims(user.id, decodedToken.uid, user.role);
		}

		res.status(200).json({ user });
	} catch (error) {
		next(error);
	}
};

export const sendAuthLinkController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email } = await EMAIL_VALIDATION.validateAsync(req.body);

		const link = await generateAuthLink(email);

		await sendAuthLinkEmail(email, link);

		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
};
