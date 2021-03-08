import { Document } from 'mongoose';
import { IAddressDocument } from './address.interface';
export enum Gender {
	male = 'male',
	female = 'female',
	undisclosed = 'undisclosed',
}
export enum Role {
	user = 'User',
	admin = 'Admin',
}

export interface IUserDocument extends Document {
	email: string;
	firstName: string;
	lastName: string;
	gender: Gender;
	address?: IAddressDocument;
	password: string;
	isActive: boolean;
	role: Role;
}
