import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import { verifyToken } from '../utils/jwt';
import { jwtConfig } from '../configs/jwt';
import HttpException from '../exceptions/http';
import User from '../models/user.model';
import Joi from '../configs/joi';
const schema = Joi.joiJWT.jwt();

export async function authJWT(req: RequestWithUser, res: Response, next: NextFunction) {
	try {
		const token = req.body.token || req.query.token || req.headers.token || req.cookies.Authorization;
		await schema.validateAsync(token);
		const decoded = verifyToken(token, jwtConfig.ACCESS);
		const { data } = decoded;
		const user = await User.findById(data._id);
		if (!user) throw new HttpException(400, 'Wrong authentication token');
		req.user = user;
		req.authenticated = true;
		next();
	} catch (error) {
		next(error);
	}
}

export async function checkRole(req: RequestWithUser, res: Response, next: NextFunction) {
	try {
		const user = req.user;
		if (user.role !== 'Admin') throw new HttpException(400, 'No permissions !');
		next();
	} catch (error) {
		next(error);
	}
}
