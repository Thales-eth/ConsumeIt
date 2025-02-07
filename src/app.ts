import 'dotenv/config';
import './loaders/log.loader';
import * as http from 'http';
import express from 'express';
import { DATABASEURL, PORT } from '@constants/env.constants';
import cors from 'cors';
import helmet from 'helmet';
import * as loaders from './loaders';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { errorHandler } from '@middleware/error.middleware';
import packageJson from '../package.json';
import { initDatabase } from '@db';

export const app = express();

app.use(
	cors({
		origin: true,
		credentials: true
	})
);

app.use(helmet());

app.use((_req, res, next) => {
	res.setHeader('Permissions-Policy', 'geolocation=(), interest-cohort=()');
	next();
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.json());
app.use(loaders.morganMiddleware);

// is this applying all middlewares to all routes? makes no sense... not all routes need oauth
loaders.middlewares(app);

loaders.router(app);

app.use(errorHandler);

const startServer = async () => {
	try {
		await initDatabase();

		const server = http.createServer(app);

		server.listen(PORT, () => {
			logger.info(`${packageJson.name} ${packageJson.version} listening on port ${PORT}!`);
			logger.info(`PROD mode is ${process.env.NODE_ENV === 'production' ? 'ON' : 'OFF'}`);
			logger.info(`Running on port ${PORT}`);
			logger.info(`Connected to database ${DATABASEURL}`);
		});

		server.on('error', loaders.onError);
	} catch (err) {
		logger.error(`Error: ${err}`);
		process.exit(1);
	}
};

startServer();
