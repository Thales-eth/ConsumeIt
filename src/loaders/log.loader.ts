import winston from 'winston';
import 'winston-daily-rotate-file';
import packageJson from '../../package.json';

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4
};

const level = () => {
	const env = process.env.NODE_ENV || 'development';
	const isDevelopment = env === 'development';
	return isDevelopment ? 'debug' : 'warn';
};

const colors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'white'
};

winston.addColors(colors);

const format = winston.format.combine(
	winston.format.timestamp({ alias: packageJson.name, format: 'DD-MM-YYYY HH:mm:ss:ms' }),
	winston.format.colorize({ all: true }),
	winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const createTransports = () => {
	return [
		new winston.transports.Console(),
		new winston.transports.DailyRotateFile({
			filename: 'logs/error-%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			level: 'error',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '5d'
		}),
		new winston.transports.DailyRotateFile({
			filename: 'logs/all-%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '5d'
		})
	];
};

const transports =
	process.env.NETLIFY_ENV === 'production'
		? [new winston.transports.Console()]
		: createTransports();

const logger = winston.createLogger({
	level: level(),
	levels,
	format,
	transports
});

(global as { logger?: winston.Logger }).logger = logger;
