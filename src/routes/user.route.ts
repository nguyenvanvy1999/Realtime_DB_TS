import { Router } from 'express';
import UsersController from '../controllers/user.controller';
import Route from '../interfaces/route.interface';
import multer from 'multer';
import Celebrate from '../middlewares/validate.middleware';

class UserRoute implements Route {
	public path = '/user';
	public router = Router();
	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.use(multer().none());
		this.router.post(`${this.path}/signup`, Celebrate.user.signup, UsersController.newUser);
	}
}

export default new UserRoute();
