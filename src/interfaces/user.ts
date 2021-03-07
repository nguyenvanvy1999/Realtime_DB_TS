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
export interface Address extends Document {
	street: string;
	city: string;
	postCode: string;
}

export interface IUserDocument extends Document {
	email: string;
	firstName: string;
	lastName: string;
	gender: Gender;
	address?: Address;
	password: string;
	isActive: boolean;
	role: Role;
}
