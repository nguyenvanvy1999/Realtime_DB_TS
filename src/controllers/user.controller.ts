import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';

class UserController {
	async newUser(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			const { email, firstName, lastName, gender, address, password } = req.body;
			const newUser = { email, firstName, lastName, gender, address, password };
			// const user = new User(newUser);
			return res.status(200).send(newUser);
		} catch (error) {
			next(error);
		}
	}
}

export default new UserController();
