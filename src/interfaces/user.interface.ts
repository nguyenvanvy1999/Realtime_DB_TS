import { Document } from 'mongoose';

export enum Gender {
	male = 'male',
	female = 'female',
	undisclosed = 'undisclosed',
}
export enum Role {
	user = 'User',
	admin = 'Admin',
}

type Address = {
	street: string;
	city: string;
	postCode: string;
};

export type SignIn = { email: string; password: string };

export type NewUser = SignIn & { firstName: string; lastName: string; gender: Gender; address?: Address };

export type UserDocument = NewUser & { isActive: boolean; role: Role };

export interface IUserDocument extends Document, UserDocument {
	_id: string;
}
