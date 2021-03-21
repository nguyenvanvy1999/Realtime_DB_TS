import joi from 'joi';
import jsonwebtoken from 'jsonwebtoken';

class Joi {
	private joiOID = joi.extend({
		type: 'objectId',
		messages: {
			invalid: 'It must have a valid ObjectId',
		},
		validate(value, helpers) {
			const objIdPattern = /^[0-9a-fA-F]{24}$/;
			const isValid = (val) => {
				return Boolean(val) && !Array.isArray(val) && objIdPattern.test(String(val));
			};
			if (!isValid(value)) return { value, errors: helpers.error('invalid') };
		},
	});
	public joiJWT = joi.extend({
		type: 'jwt',
		messages: {
			invalid: 'It must have a valid JWT',
		},
		validate(value, helpers) {
			const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/;
			if (!jwtPattern.test(String(value))) return { value, errors: helpers.error('invalid') };
			const decoded = jsonwebtoken.decode(value);
			if (!decoded) return { value, errors: helpers.error('invalid') };
		},
	});
	public joiConfig = {
		string: joi.string().required(),
		_id: this.joiOID.objectId().required(),
		email: joi.string().email().required(),
		username: joi.string().alphanum().min(4).max(20).required(),
		password: joi.string().min(4).required(),
		role: joi.string().valid('Admin', 'User'),
		token: this.joiJWT.jwt().required(),
	};
}

export default new Joi();
