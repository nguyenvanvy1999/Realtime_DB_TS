import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';
import { IUserDocument } from '../interfaces/user.interface';
import HttpException from '../exceptions/http';
import { RequestWithUser } from '../interfaces/auth.interface';

class UserMiddleware {
	public async checkRegister(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { email } = req.body;
			const user: IUserDocument = await User.findOne({ email });
			if (user) throw new HttpException(400, 'Email has been exist !');
			next();
		} catch (error) {
			next(error);
		}
	}

	public async checkRole(req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
		try {
			const { role } = req.user;
			if (role !== 'Admin') throw new HttpException(400, 'No permission !');
			next();
		} catch (error) {
			next(error);
		}
	}
	public isAuth(req, res: Response, next: NextFunction): Promise<void> {
		if (req.isAuthenticated()) next();
		throw new HttpException(400, 'Please login!');
	}
}

export default new UserMiddleware();
