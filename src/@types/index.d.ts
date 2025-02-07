import { IReqUser } from '@interfaces/models.interface';
import winston from 'winston';

export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASEURL_DEV: string;
			DATABASEURL_PROD: string;
			IV_LENGTH: string;
			KEY: string;
			ALGORITHM: string;
			PORT: string;
		}
	}

	namespace Express {
		interface Request {
			user: IReqUser;
		}
		namespace Multer {
			interface File {
				location: string;
				metada: {
					fieldName: string;
				};
				fieldname: string;
				originalname: string;
				mimetype: string;
				size: number;
				bucket: string;
			}
		}
	}
	const logger: winston.Logger;
}

export declare const logger: winston.Logger;
