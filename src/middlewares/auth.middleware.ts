import { Response, NextFunction } from 'express';
import { RequestWithUser, DataStoredInToken } from '../interfaces/auth.interface';
import { verifyToken } from '../utils/jwt';
import { jwtConfig } from '../configs/jwt';
import HttpException from '../exceptions/http';
import User from '../models/user.model';
export async function authJWT(req: RequestWithUser, res: Response, next: NextFunction) {
	try {
		const token = req.body.token || req.query.token || req.headers.token || req.cookies.Authorization;
		if (!token) throw new HttpException(400, 'No token find!');
		const decoded = verifyToken(token, jwtConfig.ACCESS) as DataStoredInToken;
		const user = await User.findById(decoded._id);
		if (!user) throw new HttpException(400, 'Wrong authentication token');
		req.user = user;
		req.authenticated = true; // FIXME:
		next();
		next();
	} catch (error) {
		next(error);
	}
}
