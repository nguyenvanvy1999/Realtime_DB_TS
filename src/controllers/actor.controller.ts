import Actor from '../models/actor.model';
import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/http';
import { RequestWithUser } from '../interfaces/auth.interface';
class ActorController {
	public async searchActor(req: Request, res: Response, next: NextFunction) {
		try {
			const { name, _id, age } = req.body;
			if (_id) {
				const actor = await Actor.findById(_id);
				return res.status(200).send({ actor });
			} else if (age) {
				const actors = await Actor.getActorByAge(parseInt(age, 10));
				return res.status(200).send({ actors });
			} else {
				const actors = await Actor.find({ name: { $regex: name } });
				return res.status(200).send({ actors });
			}
		} catch (error) {
			next(error);
		}
	}
	public async newActor(req: Request, res: Response, next: NextFunction) {
		try {
			return res.status(200).send({});
		} catch (error) {
			next(error);
		}
	}
	public async deleteActor(req: Request, res: Response, next: NextFunction) {
		try {
			return res.status(200).send({});
		} catch (error) {
			next(error);
		}
	}
	public async editActor(req: Request, res: Response, next: NextFunction) {
		try {
			return res.status(200).send({});
		} catch (error) {
			next(error);
		}
	}
}

export default new ActorController();
