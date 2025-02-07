import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const initDatabase = async () => {
	try {
		await prisma.$connect();
		logger.info('Database connection established');
		return prisma;
	} catch (error) {
		logger.error('Failed to connect to database:', error);
		process.exit(1);
	}
};

export const db = prisma;
