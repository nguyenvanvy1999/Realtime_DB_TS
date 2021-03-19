import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import { RequestWithUser } from '../interfaces/auth.interface';
import HttpException from '../exceptions/http';
import { UserDocument } from '../interfaces/user.interface';
import { returnToken, generateToken, verifyToken } from '../utils/jwt';
import Mail from '../utils/mail';
import { jwtConfig } from '../configs/jwt';

class UserController {
	public async newUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.body;
			const user = await User.findOne({ email });
			if (user) throw new HttpException(400, 'Email has been exist !');
			const newUser = UserService.newUser(req.body);
			const result = await UserService.insert(newUser);
			const token = generateToken(result, jwtConfig.VERIFY, jwtConfig.LONG_TIME);
			const config = Mail.verifyEmail(token, req);
			await Mail.sendMail(config);
			return res.status(200).send(result);
		} catch (error) {
			next(error);
		}
	}
	public async verifyAccount(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const { token } = req.params;
			if (!token) throw new HttpException(400, 'No token');
			const decoded = verifyToken(token, jwtConfig.VERIFY);
			if (!decoded) throw new HttpException(400, 'Token verify error');
			const user = await User.findById(decoded.data._id);
			if (!user) throw new HttpException(400, 'No user found');
			user.isActive = true;
			await user.save();
			return res.status(200).send({ message: 'Verify account success' });
		} catch (error) {
			next(error);
		}
	}
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
	public async editPassword(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const { password } = req.body;
			const { email } = req.user;
			const user = await User.findOne({ email });
			if (user.comparePassword(password)) throw new HttpException(400, 'New password must be change');
			const hashPassword = User.hashPassword(password);
			await User.findOneAndUpdate({ email }, { password: hashPassword }, { new: true });
			const config = Mail.resetPasswordMail(user);
			await Mail.sendMail(config);
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
	public async userProfile(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const user = req.user as UserDocument;
			return res.status(200).send(user);
		} catch (error) {
			next(error);
		}
	}
	public async postForgotPassword(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.body;
			const user = await User.findOne(email);
			if (!user) throw new HttpException(400, 'No user found!');
			const token = generateToken(user, jwtConfig.PASSWORD, jwtConfig.SHORT_TIME);
			const config = Mail.forgotPasswordMail(token, req);
			await Mail.sendMail(config);
		} catch (error) {
			next(error);
		}
	}
	public async getForgotPassword(req: Request, res: Response, next: NextFunction) {
		try {
			const { token } = req.params;
			let { password } = req.body;
			if (!token) throw new HttpException(400, 'No token');
			const decoded = verifyToken(token, jwtConfig.PASSWORD);
			if (!decoded) throw new HttpException(400, 'Token verify error');
			const user = await User.findById(decoded.data._id);
			if (!user) throw new HttpException(400, 'No user found!');
			password = User.hashPassword(password);
			user.password = password;
			await user.save();
			return res.status(200).send({ message: 'Change password success !' });
		} catch (error) {
			next(error);
		}
	}
}

export default new UserController();
