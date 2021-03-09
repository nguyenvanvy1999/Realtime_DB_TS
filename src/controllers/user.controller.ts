import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';

class UserController {
	async newUser(req: Request, res: Response, next: NextFunction): Promise<any> {
		try {
			const user = UserService.newUser(req.body);
			const result = await UserService.insert(user);
			return res.status(200).send(result);
		} catch (error) {
			next(error);
		}
	}
}

export default new UserController();
