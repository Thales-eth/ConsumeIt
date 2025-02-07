import type { Request, Response, NextFunction } from 'express';
import { cleanBearerToken } from '@utils/string.util';
import { validateToken } from '@services/firebase.service';
import { AuthorizationError } from '@errors/authorization.error';
import { uuidValidation } from '@validations/uuid.validation';

export const tokenValidation = async (
	req: Request,
	_res: Response,
	next: NextFunction
): Promise<void> => {
	const { authorization } = req.headers;

	try {
		if (!authorization) {
			throw new AuthorizationError('Unauthorized');
		}
		const { uid, role, email, _id } = await validateToken(cleanBearerToken(authorization));
		uuidValidation(_id);
		req.user = { firebaseId: uid, role, _id, email };
		next();
	} catch (err) {
		next(err);
	}
};
