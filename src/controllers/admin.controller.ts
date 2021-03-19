import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';

class AdminController {
	public async getAllUser(req: Request, res: Response, next: NextFunction) {
		try {
			const users = await User.find({}).limit(30);
			return res.status(200).send(users);
		} catch (error) {
			next(error);
		}
	}
	public async unActiveAccount(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.body;
			await User.findOneAndUpdate({ email }, { isActive: false });
			return res.status(200).send({ message: 'UnActive account success' });
		} catch (error) {
			next(error);
		}
	}
	public async deleteAccountAdmin(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.body;
			await User.findOneAndDelete({ email });
			return res.status(200).send({ message: 'Delete account success' });
		} catch (error) {
			next(error);
		}
	}
	public async cleanUser(req: Request, res: Response, next: NextFunction) {
		try {
			const result = await User.find({
				$and: [{ isActive: false }, { createdAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }], // 7 days from now
			});
			return res.status(200).send(result);
		} catch (error) {
			next(error);
		}
	}
}

export default new AdminController();
