import express from 'express';
import Config from './configs/index';
import Mongo from './configs/mongo';
import UserRoutes from './routes/user.route';
const port = Config.get('port');
const userRotes = UserRoutes();

export class Server {
	async startServer() {
		try {
			await Mongo.connect();
			const app = express();
			app.use(express.json());
			app.use(express.urlencoded({ extended: true }));
			app.use('/user', userRotes);
			app.listen(port, () => {
				console.log('app listen in ', port);
			});
		} catch (error) {
			throw new Error(error);
		}
	}
}

const server = new Server();
server.startServer();
