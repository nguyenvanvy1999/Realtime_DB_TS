export interface MailConfig {
	from: string;
	to: string;
	subject: string;
	text: string;
	html?: string | Buffer;
}

export type SentMessageInfo = any;
