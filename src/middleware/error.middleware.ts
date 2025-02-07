import type { NextFunction, Request, Response } from 'express';
import type { IError } from '@interfaces/index';

export const errorHandler = (
	error: IError,
	_req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_next: NextFunction
): void => {
	const status = error.status || 500;
	const message = error.message || 'Internal Server Error';

	res.status(status).json({ error: message });
};
