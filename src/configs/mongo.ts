import Config from './index';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { logger } from '../utils/logger';

const uri = Config.get('mongo_uri');
const debug = Config.isDebug();
mongoose.Promise = global.Promise;
const mongoOption = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	ignoreUndefined: true,
	useFindAndModify: false,
};

interface MongoOption {
	[key: string]: boolean;
}

class Mongo {
	uri: string;
	setting: MongoOption;
	constructor(mongoUri: string, setting: MongoOption) {
		this.uri = mongoUri;
		this.setting = setting;
	}

	async connect() {
		try {
			if (debug) {
				const mongo = new MongoMemoryServer();
				const testUri = await mongo.getUri();
				await mongoose.connect(testUri, this.setting);
				return logger.info('🟢 Connected to Test DB');
			}
			await mongoose.connect(this.uri, this.setting);
			return logger.info('🟢 Connected to DB');
		} catch (error) {
			logger.error(`🔴 Unable to connect to DB: ${error}.`);
			throw new Error(error);
		}
	}
	async close() {
		try {
			await mongoose.connection.close();
			return logger.info('🟢 Disconnected to DB');
		} catch (error) {
			logger.error(`🔴 Unable to disconnect to DB: ${error}.`);
			throw new Error(error);
		}
	}

	async clearData() {
		try {
			const collections = mongoose.connection.collections;
			for (const key of Object.keys(collections)) {
				const collection = collections[key];
				await collection.deleteMany({});
			}
			logger.info('🟢 Clear DB');
		} catch (error) {
			logger.error(`🔴 Unable to clear  DB: ${error}.`);
			throw new Error(error);
		}
	}
}

export default new Mongo(uri, mongoOption);
