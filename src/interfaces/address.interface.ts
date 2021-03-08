import { Document } from 'mongoose';

export interface IAddressDocument extends Document {
	street: string;
	city: string;
	postCode: string;
}
