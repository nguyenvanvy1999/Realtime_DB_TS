import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { connect, set } from 'mongoose';
import Routes from './interfaces/route.interface';
import Config from './configs/index';

class App {
	public app: express.Application;
	public port: string | number;
	public env: string;

	constructor(routes: Routes[]) {
		this.app = express();
		this.port = Config.get('port');
		this.env = Config.get('node_env');
		// this.connectToDatabase();
		// this.initializeMiddlewares();
		// this.initializeRoutes(routes);
		// this.initializeSwagger();
		// this.initializeErrorHandling();
	}
}
