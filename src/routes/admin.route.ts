import { Router } from 'express';
import Route from '../interfaces/route.interface';
import multer from 'multer';
import { authJWT, checkRole } from '../middlewares/auth.middleware';
import AdminController from '../controllers/admin.controller';

class AdminRoute implements Route {
	public path: string = '/admin';
	public router = Router();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes() {
		this.router.use(multer().none());
		this.router.use(authJWT, checkRole);
		this.router.post('/clear', AdminController.cleanUser);
		this.router.get('/users', AdminController.getAllUser);
		this.router.get('/user', AdminController.getUser);
		this.router.get('/disable', AdminController.unActiveAccount);
		this.router.get('/delete', AdminController.deleteAccountAdmin);
	}
}

export default new AdminRoute();
