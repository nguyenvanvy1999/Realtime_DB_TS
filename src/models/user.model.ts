import mongoose, { Schema, Document, Model, model } from 'mongoose';
import bcrypt from 'bcrypt';
import Config from '../configs/index';
import { IUserDocument, Gender } from '../interfaces/user.interface';

const salt: number = parseInt(Config.get('salt'), 10);

export interface IUser extends IUserDocument {
	comparePassword(password: string): boolean;
	fullName(): string;
}

export interface IUserModel extends Model<IUser> {
	hashPassword(password: string): string;
}

const UserSchema: Schema = new Schema({
	email: { type: String, required: true, unique: true, lowercase: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	gender: { type: String, enum: Object.values(Gender), default: 'undisclosed' },
	address: {
		street: { type: String },
		city: { type: String },
		postCode: { type: String },
	},
	password: { type: String, min: 4 },
	isActive: { type: Boolean, default: false },
	role: { type: String, enum: ['User', 'Admin'], default: 'User' },
});

UserSchema.pre('save', async function (this: IUser, next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, salt);
	}
	next();
});

UserSchema.pre('remove', async function (next): Promise<void> {
	const user = this;
	user.model('Data').deleteMany({ user: this._id });
	next();
});
UserSchema.methods.comparePassword = function (this: IUser, password: string): boolean {
	if (bcrypt.compareSync(password, this.password)) return true;
	return false;
};

UserSchema.methods.fullName = function (this: IUser): string {
	return this.firstName + ' ' + this.lastName;
};

UserSchema.statics.hashPassword = function hashPassword(password: string): string {
	return bcrypt.hashSync(password, salt);
};

const User: IUserModel = model<IUser, IUserModel>('User', UserSchema);
export default User;
