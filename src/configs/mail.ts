import Config from './index';
import nodemailerSendgrid from 'nodemailer-sendgrid';

// check if has using grid_api_mail
export function mailConfig() {
	const grid = Config.get('sendgrid-api-key');
	let transportConfig;
	if (grid) {
		transportConfig = nodemailerSendgrid({ apiKey: grid });
	} else {
		transportConfig = {
			service: 'gmail',
			auth: { user: Config.get('smtp-user'), pass: Config.get('smtp-password') },
		};
	}
	return transportConfig;
}
