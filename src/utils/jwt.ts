import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/http';
import { jwtConfig } from '../configs/jwt';
import { DataStoredInToken, Token } from '../interfaces/auth.interface';
export function generateToken(user: DataStoredInToken, secretSignature: string, tokenLife: any): string {
	try {
		const userData = { _id: user._id, email: user.email };
		return jwt.sign({ data: userData }, secretSignature, {
			algorithm: 'HS256',
			expiresIn: tokenLife,
		});
	} catch (error) {
		throw new HttpException(400, error.message);
	}
}

export function verifyToken(token: string, secretKey: string) {
	try {
		return jwt.verify(token, secretKey) as Token;
	} catch (error) {
		throw new HttpException(400, error.message);
	}
}

export function returnToken(user: DataStoredInToken) {
	try {
		const accessToken = generateToken(user, jwtConfig.ACCESS, jwtConfig.SHORT_TIME);
		const refreshToken = generateToken(user, jwtConfig.REFRESH, jwtConfig.LONG_TIME);
		return { accessToken, refreshToken };
	} catch (error) {
		throw new HttpException(400, error.message);
	}
}
