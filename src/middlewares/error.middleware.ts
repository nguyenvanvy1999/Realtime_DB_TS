import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http';
import { logger } from '../utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
	try {
		const name: string = error.name;
		const status: number = error.status || 500;
		const message: string = error.message || 'Something went wrong';
		logger.error(`StatusCode : ${status}, Message : ${name} ${message}`);
		res.status(status).json({ name, message });
	} catch (error) {
		next(error);
	}
};

const handleNotFoundPage = (req: Request, res: Response) => {
	return res.status(404).json({ message: `${req.method}${req.url} not found` });
};

export { errorMiddleware, handleNotFoundPage };
