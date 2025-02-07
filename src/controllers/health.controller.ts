import type { Request, Response } from 'express';

export const HealthStatus = (_req: Request, res: Response): void => {
	res.sendStatus(200);
};
