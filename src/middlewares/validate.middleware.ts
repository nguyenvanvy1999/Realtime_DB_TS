import Schema from '../configs/celebrate';
import { celebrate } from 'celebrate';

const Celebrate = {
	user: {
		login: celebrate(Schema.user.login),
		signup: celebrate(Schema.user.signup),
		editProfile: celebrate(Schema.user.editProfile),
		editPassword: celebrate(Schema.user.editPassword),
		verifyAccount: celebrate(Schema.user.verifyAccount),
		postForgotPassword: celebrate(Schema.user.postForgotPassword),
		getForgetPassword: celebrate(Schema.user.getForgotPassword),
		token: celebrate(Schema.user.token),
		search: celebrate(Schema.user.search),
	},
	device: {
		getDevice: celebrate(Schema.device.getDevice),
		deviceID: celebrate(Schema.device.deviceID),
	},
	zone: {
		newZone: celebrate(Schema.zone.newZone),
		one: celebrate(Schema.zone.one),
		many: celebrate(Schema.zone.many),
	},
};

export default Celebrate;