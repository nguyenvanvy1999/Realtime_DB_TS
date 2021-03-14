import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import HttpException from '../exceptions/http';
import AuthService from '../services/auth.service';
import { returnToken } from '../utils/jwt';
class AuthController {
	public async signIn(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user) throw new HttpException(400, 'Email wrong');
			const isPassword = user.comparePassword(password);
			if (!isPassword) throw new HttpException(400, 'Password wrong');
			if (!user.isActive) throw new HttpException(400, 'Please active account first');
			const token = returnToken(user);
			return res.status(200).send({ token });
		} catch (error) {
			next(error);
		}
	}
	public async test(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const user = req.user;
			const auth = req.authenticated;
			return res.status(200).send({ user, auth });
		} catch (error) {
			next(error);
		}
	}
}

export default new AuthController();
