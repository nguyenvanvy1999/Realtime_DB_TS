import { Request } from 'express';
import { IUserDocument } from './user.interface';

export interface DataStoredInToken {
	_id: string;
	email: string;
}

export interface TokenData {
	token: string;
	expiresIn: number;
}

export interface RequestWithUser extends Request {
	user: IUserDocument;
	authenticated: boolean;
}
