import { Router } from 'express';
import FilmController from '../controllers/film.controller';
import Route from '../interfaces/route.interface';
import multer from 'multer';
import { authJWT } from '../middlewares/auth.middleware';

class FilmRoute implements Route {
	public path: string = '/actor';
	public router = Router();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes() {
		this.router.use(multer().none());
	}
}

export default new FilmRoute();
