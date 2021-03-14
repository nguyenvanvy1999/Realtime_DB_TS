import { IUserDocument } from '../interfaces/user.interface';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import jwt from 'jsonwebtoken';

class AuthService {
	public createCookie(tokenData: TokenData): string {
		return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
	}
}

export default new AuthService();
