import { Router } from 'express';
import UserController from '../controllers/user.controller';
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
		this.router
			.route(`${this.path}`)
			.get(Celebrate.user.token, UserController.userProfile)
			.post(Celebrate.user.signup, UserController.newUser)
			.patch(Celebrate.user.editProfile, UserController.editProfile)
			.delete(Celebrate.user.token, UserController.deleteUser);
		this.router.post(`${this.path}/signin`, Celebrate.user.signin, UserController.signIn);
		this.router.post(`${this.path}/verify/:token`, UserController.verifyAccount);
		this.router
			.route(`${this.path}/reset/:token`)
			.post(UserController.postForgotPassword)
			.get(UserController.getForgotPassword);
		this.router.post(`${this.path}/password/`, UserController.editPassword);
	}
}

export default new UserRoute();
