import { Document } from 'mongoose';

export enum ActorGender {
	male = 'male',
	female = 'female',
}

export type ActorDocument = {
	firstName: string;
	lastName: string;
	gender: ActorGender;
	nation: string;
	Dob: Date;
	info: any;
	films: string[];
};

export interface IActorDocument extends Document, ActorDocument {}
