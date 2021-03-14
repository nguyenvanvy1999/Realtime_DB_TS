import { Segments } from 'celebrate';
import joi from 'joi';
import Joi from './joi';
const joiConfig = Joi.joiConfig;

const Schema = {
	user: {
		signin: {
			[Segments.BODY]: { email: joiConfig.email, password: joiConfig.password },
		},
		signup: {
			[Segments.BODY]: {
				email: joiConfig.email,
				firstName: joiConfig.string,
				lastName: joiConfig.string,
				password: joiConfig.password,
				confirmPassword: joi
					.any()
					.equal(joi.ref('password'))
					.required()
					.label('Confirm password')
					.options({ messages: { 'any.only': '{{#label}} does not match' } }),
			},
		},
		search: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
			[Segments.PARAMS]: {},
		},
		editProfile: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
			[Segments.BODY]: {
				firstName: joiConfig.string,
				lastName: joiConfig.string,
			},
		},
		editPassword: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
			[Segments.BODY]: {
				password: joiConfig.password,
				confirmPassword: joi.string().valid(joi.ref('password')).required(),
			},
		},
		verifyAccount: {
			[Segments.QUERY]: joiConfig.token,
		},
		getForgotPassword: {
			[Segments.BODY]: { email: joiConfig.email },
		},
		postForgotPassword: {
			[Segments.QUERY]: joiConfig.token,
			[Segments.BODY]: {
				password: joiConfig.password,
				confirmPassword: joi.string().valid(joi.ref('password')).required(),
			},
		},
		token: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
		},
	},
	device: {
		getDevice: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
			[Segments.BODY]: {
				type: joiConfig.string,
				model: joiConfig.string,
				name: joiConfig.string,
				deviceID: joiConfig.string,
			},
		},
		deviceID: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
			[Segments.QUERY]: { deviceID: joiConfig._id },
		},
	},
	zone: {
		newZone: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
			[Segments.BODY]: {
				description: joiConfig.string,
				name: joiConfig.string,
				deviceID: joiConfig._id,
			},
		},
		one: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
			[Segments.BODY]: {
				zoneID: joiConfig._id,
				deviceID: joiConfig._id,
			},
		},
		many: {
			[Segments.HEADERS]: joi.object({ token: joiConfig.token }).unknown(),
			[Segments.BODY]: {
				zoneID: joiConfig._id.required(),
				devicesID: joi.array().items(joiConfig._id.required()),
			},
		},
	},
};

export default Schema;
