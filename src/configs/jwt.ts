import path from 'path';
import fs from 'fs';
import { isEmpty } from '../utils/empty';
import { logger } from '../utils/logger';

interface Secret {
	[key: string]: string;
}
export function readSecret(file: string): Secret {
	try {
		const pathFile = path.join(__dirname, './keys', file + '.json');
		const obj = JSON.parse(fs.readFileSync(pathFile, 'utf8'));
		if (isEmpty(obj)) throw new Error('Please check your jwt secret key file');
		return obj;
	} catch (error) {
		logger.error(error);
		throw new Error(error.message);
	}
}
const secret = readSecret('secret');

export const jwtConfig = {
	ACCESS: secret.access,
	REFRESH: secret.refresh,
	VERIFY: secret.verify,
	DEVICE: secret.device,
	PASSWORD: secret.password,
	SHORT_TIME: 900, // 15 minutes
	LONG_TIME: 86400,
};
