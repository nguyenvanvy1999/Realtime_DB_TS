import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import { RequestWithUser } from '../interfaces/auth.interface';
import HttpException from '../exceptions/http';

class UserController {
	public async newUser(req: Request, res: Response, next: NextFunction) {
		try {
			const user = UserService.newUser(req.body);
			const result = await UserService.insert(user);
			return res.status(200).send(result);
		} catch (error) {
			next(error);
		}
	}
	public async editPassword(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const { password } = req.body;
			const { email } = req.user;
			const user = await User.findOne({ email });
			if (user.comparePassword(password)) throw new HttpException(400, 'New password must be change');
			const hashPassword = User.hashPassword(password);
			await User.findOneAndUpdate({ email }, { password: hashPassword }, { new: true });
			return res.status(200).send({ message: 'Update password success!' });
		} catch (error) {
			next(error);
		}
	}
	public async editProfile(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const { email } = req.user;
			const userData = req.body;
			await User.findOneAndUpdate({ email }, { ...userData }, { new: true });
			return res.status(200).send({ message: 'Update profile success' });
		} catch (error) {
			next(error);
		}
	}
	public async deleteUser(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const { email } = req.user;
			await User.findOneAndDelete({ email });
			return res.status(200).send({ message: 'Delete account success' });
		} catch (error) {
			next(error);
		}
	}
}

export default new UserController();
