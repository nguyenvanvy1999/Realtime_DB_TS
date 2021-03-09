import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/http';
import { logger } from '../utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
	try {
		const status: number = error.status || 500;
		const message: string = error.message || 'Something went wrong';

		logger.error(`StatusCode : ${status}, Message : ${message}`);
		res.status(status).json({ message });
	} catch (error) {
		next(error);
	}
};

const handleNotFoundPage = (req: Request, res: Response) => {
	return res.status(404).json({ message: `${req.url} not found` });
};

export { errorMiddleware, handleNotFoundPage };
