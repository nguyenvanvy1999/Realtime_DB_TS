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
export interface SignIn {
	email: string;
	password: string;
}
export interface NewUser extends SignIn {
	firstName: string;
	lastName: string;
	gender: Gender;
	address?: IAddressDocument;
}

export interface UserDocument extends NewUser {
	isActive: boolean;
	role: Role;
}

export interface IUserDocument extends Document {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	gender: Gender;
	address?: IAddressDocument;
	password: string;
	isActive: boolean;
	role: Role;
}
