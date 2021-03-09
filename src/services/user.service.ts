import User from '../models/user.model';
import { NewUser, UserDocument, Role, IUserDocument } from '../interfaces/user.interface';
import HttpException from '../exceptions/http';
import mongoose from 'mongoose';

class UserService {
	public newUser(user: NewUser): UserDocument {
		try {
			const newUser = {
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				password: user.password,
				isActive: false,
				gender: user.gender,
				role: Role.user,
			};
			return newUser;
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
	public async insert(user: UserDocument): Promise<IUserDocument> {
		try {
			const newUser = new User(user);
			return await newUser.save();
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
}

export default new UserService();