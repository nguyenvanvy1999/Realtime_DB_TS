import { Request } from 'express';
import { UserDocument } from './user.interface';
export interface DataStoredInToken {
	_id: string;
	email: string;
}

export interface Token {
	data: DataStoredInToken;
	iat: number;
	exp: number;
}

export interface RequestWithUser extends Request {
	user: UserDocument;
	authenticated: boolean;
}
