import { firebase } from '@loaders/firebase.loader';
import type { auth } from 'firebase-admin';

export const setCustomClaims = async (_id: string, uid: string, role: string): Promise<void> => {
	return await firebase.auth().setCustomUserClaims(uid, { _id, role });
};

export const updateUser = async (
	uid: string,
	update: auth.UpdateRequest
): Promise<auth.UserRecord> => {
	return await firebase.auth().updateUser(uid, update);
};

export const validateToken = async (token: string): Promise<auth.DecodedIdToken> => {
	return await firebase.auth().verifyIdToken(token);
};

export const deleteFirebaseUser = (id_firebase: string): Promise<void> =>
	firebase.auth().deleteUser(id_firebase);

export const verifyEmailUserFirebase = async (email: string): Promise<boolean> => {
	const user = await firebase
		.auth()
		.getUserByEmail(email)
		.catch(() => null);
	return !!user;
};
