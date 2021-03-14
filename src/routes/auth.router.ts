import { Router } from 'express';
import UserController from '../controllers/user.controller';
import Route from '../interfaces/route.interface';
import multer from 'multer';
import Celebrate from '../middlewares/validate.middleware';
import AuthController from '../controllers/auth.controller';
import { authJWT } from '../middlewares/auth.middleware';

class AuthRoute implements Route {
	public path = '/auth';
	public router = Router();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes() {
		this.router.use(multer().none());
		this.router.post('/signin', AuthController.signIn);
		this.router.get('/test', authJWT, AuthController.test);
	}
}

export default new AuthRoute();
