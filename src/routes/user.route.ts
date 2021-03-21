import { Router } from 'express';
import UserController from '../controllers/user.controller';
import Route from '../interfaces/route.interface';
import multer from 'multer';
import Celebrate from '../middlewares/validate.middleware';
import { authJWT } from '../middlewares/auth.middleware';
class UserRoute implements Route {
	public path: string = '/user';
	public router = Router();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes() {
		this.router.use(multer().none());
		this.router
			.route('/')
			.get(authJWT, UserController.userProfile)
			.post(Celebrate.user.signup, UserController.newUser)
			.patch(Celebrate.user.editProfile, authJWT, UserController.editProfile)
			.delete(authJWT, UserController.deleteUser);
		this.router.post('/signin', Celebrate.user.signin, UserController.signIn);
		this.router.post('/verify/:token', UserController.verifyAccount);
		this.router.route('/reset/:token').post(UserController.postForgotPassword).get(UserController.getForgotPassword);
		this.router.post('/password/', authJWT, UserController.editPassword);
	}
}

export default new UserRoute();
