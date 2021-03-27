import path from 'path';
import HttpException from '../exceptions/http';
import fs from 'fs';
import { getTime } from '../utils/time';
import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

class MulterConfig {
	private multerConfig = {
		maxSize: 1024 * 1024 * 5,
		fileMime: [
			{ name: 'jpg', type: 'image/jpg' },
			{ name: 'png', type: 'image/png' },
			{ name: 'jpeg', type: 'image/jpeg' },
			{ name: 'mp4', type: 'video/mp4' },
			{ name: 'avi', type: 'video/avi' },
			{ name: 'mov', type: 'video/mov' },
			{ name: 'flv', type: 'video/flv' },
			{ name: 'wmv', type: 'video/wmv' },
		],
		fileExt: ['.jpg', '.png', '.jpeg', '.mp4', '.mov', '.flv', '.wmv', '.avi'],
	};
	private checkFile(file: Express.Multer.File) {
		const mime = this.multerConfig.fileMime.find((types) => types.type === file.mimetype);
		const ext = this.multerConfig.fileExt.includes(path.extname(file.originalname));
		if (mime && ext) {
			return true;
		}
		return false;
	}
	private fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback): void {
		if (!this.checkFile(file)) return cb(new HttpException(400, 'Only images are allowed'));
		cb(null, true);
	}
	private storage = multer.diskStorage({
		destination(
			req: Request,
			file: Express.Multer.File,
			cb: (error: Error | null, destination: string) => void
		): string | void {
			const fileType = file.mimetype;
			const dir = `./uploads/${fileType}`;
			fs.mkdirSync(dir, { recursive: true });
			return cb(null, dir);
		},
		filename(req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void): void {
			cb(null, getTime() + '_' + file.originalname);
		},
	});
	public upload = multer({
		storage: this.storage,
		fileFilter: this.fileFilter,
		limits: { fileSize: this.multerConfig.maxSize },
	});
}

export default new MulterConfig();
