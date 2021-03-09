import { Router } from 'express';
import IndexController from '../controllers/index.controller';
import Route from '../interfaces/route.interface';

class IndexRoute implements Route {
	public path = '/';
	public router = Router();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, IndexController.index);
	}
}

export default new IndexRoute();
