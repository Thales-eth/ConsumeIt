import type { Application } from 'express';
import * as routes from '../router';
import { PREFIX_API_URL } from '@constants/routes.constants';
import { IRouterMid } from '@interfaces/config.interface';

export const router = (app: Application): void => {
	Object.values(routes).forEach((route: IRouterMid) => {
		const { path, router, middlewares = [] } = route;
		app.use(PREFIX_API_URL + path, ...middlewares, router);
	});
};
