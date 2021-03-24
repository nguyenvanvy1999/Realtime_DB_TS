import { Router } from 'express';
import FilmController from '../controllers/film.controller';
import Route from '../interfaces/route.interface';
import multer from 'multer';
import { authJWT, checkRole } from '../middlewares/auth.middleware';

class FilmRoute implements Route {
	public path: string = '/film';
	public router = Router();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes() {
		this.router.use(multer().none());
		this.router
			.route('/')
			.all(authJWT, checkRole)
			.post(FilmController.newFilm)
			.put(FilmController.editFilm)
			.delete(FilmController.deleteFilm);
		this.router.get('/search', FilmController.getFilm);
		this.router.get('/stream/:name', FilmController.streamFilm);
	}
}

export default new FilmRoute();
