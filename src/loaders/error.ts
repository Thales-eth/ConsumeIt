import { PORT } from '@constants/env.constants';

const onError = (error: NodeJS.ErrnoException): void => {
	if (error.syscall !== 'listen') throw error;
	const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;
	switch (error.code) {
		case 'EACCES':
			console.error(`${bind} requires elevated privileges`);
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(`${bind} is already in use`);
			process.exit(1);
			break;
		default:
			throw error;
	}
};

export { onError };
