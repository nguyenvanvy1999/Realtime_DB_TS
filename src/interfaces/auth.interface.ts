import { Request } from 'express';
import { UserDocument } from './user.interface';
export type DataStoredInToken = {
	_id: string;
	email: string;
};

export type Token = {
	data: DataStoredInToken;
	iat: number;
	exp: number;
};

export interface RequestWithUser extends Request {
	user: UserDocument;
	authenticated: boolean;
}
