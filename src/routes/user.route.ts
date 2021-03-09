import { Router } from 'express';
import UsersController from '../controllers/user.controller';
import Route from '../interfaces/route.interface';
import multer from 'multer';

class UsersRoute implements Route {
	public path = '/users';
	public router = Router();
	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.use(multer().none());
		this.router.post(`${this.path}/signup`, UsersController.newUser);
	}
}

export default new UsersRoute();
