import { db } from '@db';
import { IDBUserData } from '@interfaces/user.interface';
import { User, UserRole } from '@prisma/client';

export const getDBUser = async (uid: string): Promise<Partial<User> | null> => {
	return db.user.findUnique({
		where: { firebaseId: uid },
		select: {
			id: true,
			firebaseId: true,
			email: true,
			username: true,
			role: true
		}
	});
};

export const createDBUser = async ({
	email,
	firebaseId,
	role
}: {
	email: string;
	role: UserRole;
	firebaseId: string;
}): Promise<User> => {
	return await db.user.create({ data: { email, role, firebaseId } });
};

export const updateDBUser = async ({
	id,
	data
}: {
	id: string;
	data: { email?: string; username?: string; role?: UserRole };
}): Promise<User> => {
	return await db.user.update({ where: { id }, data });
};

export const findDBUserByEmail = async (email: string): Promise<IDBUserData | null> => {
	return db.user.findUnique({
		where: { email },
		select: {
			id: true,
			firebaseId: true,
			email: true,
			username: true,
			role: true
		}
	});
};

export const findUserCustomerId = async (id: string): Promise<string | null> => {
	const user = await db.user.findUnique({ where: { id }, select: { customerId: true } });
	return user?.customerId || null;
};

export const deleteDBUser = async (id: string): Promise<User> => {
	return await db.user.update({ where: { id }, data: { deleted: true } });
};

export const updateDBUserCustomerId = async (id: string, customerId: string): Promise<User> => {
	return await db.user.update({ where: { id }, data: { customerId } });
};
