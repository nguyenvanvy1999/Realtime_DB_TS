import Actor from '../models/actor.model';
import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/http';
import { RequestWithUser } from '../interfaces/auth.interface';
class ActorController {
	public async searchActorByName(req: Request, res: Response, next: NextFunction) {
		try {
			const { name } = req.body;
			const actors = await Actor.find({ name: { $regex: name } });
			return res.status(200).send({ actors });
		} catch (error) {
			next(error);
		}
	}
	public async getActor(req: Request, res: Response, next: NextFunction) {
		try {
			const actor = await Actor.findOne();
		} catch (error) {
			next(error);
		}
	}
}

export default new ActorController();
