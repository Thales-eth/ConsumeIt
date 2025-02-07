import type { Router, RequestHandler } from 'express';

export interface IRouter {
	path: string;
	router: Router;
}

export interface IRouterMid extends IRouter {
	middlewares?: RequestHandler[];
}
