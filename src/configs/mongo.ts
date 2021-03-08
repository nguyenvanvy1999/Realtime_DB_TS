import Config from './index';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

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
				return console.log(`Connected Test DB ! `);
			}
			await mongoose.connect(this.uri, this.setting);
			return console.log(`Connected DB !`);
		} catch (error) {
			throw new Error(error);
		}
	}
	async close() {
		try {
			await mongoose.connection.close();
			return console.log(`Disconnected DB !`);
		} catch (error) {
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
		} catch (error) {
			throw new Error(error);
		}
	}
}

export default new Mongo(uri, mongoOption);
