import morgan, { type StreamOptions } from 'morgan';
import type { Request, Response } from 'express';

const stream: StreamOptions = {
	write: (message) => logger.http(message)
};

const skip = (_req: Request, res: Response) => {
	const env = process.env.NODE_ENV || 'development';
	return env !== 'development' && res.statusCode < 400;
};

export const morganMiddleware = morgan(
	':method :url :status :res[content-length] - :response-time ms',
	{
		stream,
		skip
	}
);
