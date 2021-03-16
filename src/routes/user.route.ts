import { Router } from 'express';
import UsersController from '../controllers/user.controller';
import Route from '../interfaces/route.interface';
import multer from 'multer';
import Celebrate from '../middlewares/validate.middleware';
import userController from '../controllers/user.controller';
import { celebrate } from 'celebrate';

class UserRoute implements Route {
	public path = '/user';
	public router = Router();
	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.use(multer().none());
		this.router
			.route(`${this.path}`)
			.get(Celebrate.user.token, userController.userProfile)
			.post(Celebrate.user.signup, userController.newUser)
			.patch(Celebrate.user.editProfile, UsersController.editProfile)
			.delete(Celebrate.user.token, userController.deleteUser);
		this.router.post(`${this.path}/signin`, Celebrate.user.signin, userController.signIn);
	}
}

export default new UserRoute();
