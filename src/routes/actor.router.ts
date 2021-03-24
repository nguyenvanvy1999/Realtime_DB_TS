import { Router } from 'express';
import ActorController from '../controllers/actor.controller';
import Route from '../interfaces/route.interface';
import multer from 'multer';
import { authJWT, checkRole } from '../middlewares/auth.middleware';

class ActorRoute implements Route {
	public path: string = '/actor';
	public router = Router();
	constructor() {
		this.initializeRoutes();
	}
	private initializeRoutes() {
		this.router.use(multer().none());
		this.router
			.route('/')
			.all(authJWT, checkRole)
			.post(ActorController.newActor)
			.put(ActorController.editActor)
			.delete(ActorController.deleteActor);
		this.router.get('/search', ActorController.searchActor);
	}
}

export default new ActorRoute();
