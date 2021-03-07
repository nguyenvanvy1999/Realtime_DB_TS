import express from 'express';
import Config from './config/index';
import Mongo from './config/mongo';

const port = Config.get('port');

export class Server {
	async startServer() {
		try {
			await Mongo.connect();
			const app = express();
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
