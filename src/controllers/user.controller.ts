import { NextFunction, Request, Response } from 'express';
import { deleteDBUser, getDBUser, updateDBUser } from '@repositories/user.repository';
import { deleteFirebaseUser, setCustomClaims, updateUser } from '@services/firebase.service';
import { userUpdateValidation } from '@validations/user.validation';
import { auth } from 'firebase-admin';

export const getDBUserController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { firebaseId } = req.user;
		const user = await getDBUser(firebaseId);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { firebaseId, _id } = req.user;
		const { role, email, username } = await userUpdateValidation.validateAsync(req.body);

		await updateDBUser({ id: _id, data: req.body });

		const firebaseUpdatedData: auth.UpdateRequest = {};
		if (email) firebaseUpdatedData.email = email;
		if (username) firebaseUpdatedData.displayName = username;

		await updateUser(firebaseId, firebaseUpdatedData);
		if (role) await setCustomClaims(_id, firebaseId, role);

		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
};

export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { firebaseId, _id } = req.user;
		await deleteFirebaseUser(firebaseId);
		await deleteDBUser(_id);
		res.sendStatus(200);
	} catch (error) {
		next(error);
	}
};
