import { NextFunction, Request, Response } from 'express';

class IndexController {
	public index = (req: Request, res: Response, next: NextFunction) => {
		try {
			return res.status(200).send({ message: 'Hello world' });
		} catch (error) {
			next(error);
		}
	};
}

export default new IndexController();
