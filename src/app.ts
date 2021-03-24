import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import Routes from './interfaces/route.interface';
import Config from './configs/index';
import { errorMiddleware, handleNotFoundPage } from './middlewares/error.middleware';
import { logger, stream } from './utils/logger';
import Mongo from './configs/mongo';
import path from 'path';
import favicon from 'serve-favicon';

class App {
	public app: express.Application;
	public port: string | number;
	public env: string;

	constructor(routes: Routes[]) {
		this.app = express();
		this.port = Config.get('port');
		this.env = Config.get('node_env');
		this.connectToDatabase();
		this.initializeMiddlewares();
		this.initializeRoutes(routes);
		this.initializeSwagger();
		this.initializeErrorHandling();
	}
	public listen() {
		this.app.listen(this.port, () => {
			logger.info(`🚀 App listening on the port ${this.port}`);
		});
	}
	public getServer() {
		return this.app;
	}
	private async connectToDatabase() {
		await Mongo.connect();
	}
	private initializeMiddlewares() {
		if (this.env === 'prod') {
			this.app.use(morgan('combined', { stream }));
			this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
		} else if (this.env === 'dev') {
			this.app.use(morgan('dev'));
			this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream }));
			this.app.use(cors({ origin: true, credentials: true }));
		}
		this.app.use(express.static(path.join(__dirname, '../public')));
		this.app.use(favicon(path.join(__dirname, '../public/favicon.ico')));
		this.app.use(hpp());
		this.app.use(helmet());
		this.app.use(compression());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cookieParser());
	}
	private initializeRoutes(routes: Routes[]) {
		routes.forEach((route) => {
			this.app.use(route.path, route.router);
		});
	}
	private initializeSwagger() {
		const options = {
			swaggerDefinition: {
				info: { title: 'REST API', version: '1.0.0', description: 'Nodejs Database built with typescript' },
			},
			apis: ['swagger.yaml'],
		};
		const specs = swaggerJSDoc(options);
		this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
	}
	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
		this.app.use(handleNotFoundPage);
	}
}

export default App;
