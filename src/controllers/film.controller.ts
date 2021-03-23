import Film from '../models/film.model';
import { Request, Response, NextFunction } from 'express';

class FilmController {
	public async getFilm(req: Request, res: Response, next: NextFunction) {
		try {
			const _id = req.body._id;
			const { name, year } = req.body;
			const film = await Film.findOne({ _id });
			const test = await Film.find({ name, year });
		} catch (error) {
			next(error);
		}
	}
}

export default new FilmController();
