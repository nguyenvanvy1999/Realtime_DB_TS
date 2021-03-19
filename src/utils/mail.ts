import nodemailer from 'nodemailer';
import { mailConfig } from '../configs/mail';
import HttpException from '../exceptions/http';
const config = mailConfig();
import { UserDocument } from '../interfaces/user.interface';
import { Request } from 'express';
import { MailConfig, SentMessageInfo } from '../interfaces/mail.interface';
import Config from '../configs/index';
const email = Config.get('smtp_user');
class Mail {
	public async sendMail(setting: MailConfig): Promise<SentMessageInfo> {
		try {
			if (Config.isTest()) return; // if TEST => no send mail
			const transporter = nodemailer.createTransport(config);
			return await transporter.sendMail(setting);
		} catch (error) {
			throw new HttpException(400, error.message);
		}
	}
	public verifyEmail(token: string, req: Request): MailConfig {
		const mailOptions = {
			to: req.body.email,
			from: email,
			subject: 'Please verify your email address on DataCenter',
			text: `Thank you for registering with DataCenter.\n\n
	This verify your email address please click on the following link, or paste this into your browser:\n\n
	http://${req.headers.host}/user/verify/${token}\n\n
	\n\n
	Thank you!`,
		};
		return mailOptions;
	}
	public resetPasswordMail(user: UserDocument): MailConfig {
		const mailOptions = {
			to: user.email,
			from: email,
			subject: 'Your DataCenter password has been changed',
			text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`,
		};
		return mailOptions;
	}
	public forgotPasswordMail(token: string, req: Request): MailConfig {
		const mailOptions = {
			to: req.body.email,
			from: email,
			subject: 'Reset your password on DataCenter',
			text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
		Please click on the following link, or paste this into your browser to complete the process:\n\n
		http://${req.headers.host}/user/reset/${token}\n\n
		If you did not request this, please ignore this email and your password will remain unchanged.\n`,
		};
		return mailOptions;
	}
}

export default new Mail();
