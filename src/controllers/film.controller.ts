import Film from '../models/film.model';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import HttpException from '../exceptions/http';
import Config from '../configs/index';
import { RequestWithUser } from '../interfaces/auth.interface';
import { uploadUtil } from '../utils/upload';

class FilmController {
	public async getFilm(req: Request, res: Response, next: NextFunction) {
		try {
			const { name } = req.params;
			const film = await Film.find({ name: { $regex: name } });
			return res.status(200).send({ film });
		} catch (error) {
			next(error);
		}
	}
	public async newFilm(req: Request, res: Response, next: NextFunction) {
		try {
			return res.status(200).send({});
		} catch (error) {
			next(error);
		}
	}
	public async deleteFilm(req: Request, res: Response, next: NextFunction) {
		try {
			const { name } = req.params;
			await Film.findOneAndDelete({ name });
			return res.status(200).send({ message: 'Delete film success! ' });
		} catch (error) {
			next(error);
		}
	}
	public async editFilm(req: Request, res: Response, next: NextFunction) {
		try {
			return res.status(200).send({});
		} catch (error) {
			next(error);
		}
	}
	public async streamFilm(req: Request, res: Response, next: NextFunction) {
		try {
			const { name } = req.params;
			const videoPath = path.join(__dirname, '../../public/video/', name + '.mp4');
			if (!fs.existsSync(videoPath)) throw new HttpException(404, 'File not found');
			const stat = fs.statSync(videoPath);
			const total = stat.size;
			if (req.headers.range) {
				const range = req.headers.range;
				const parts = range.replace(/bytes=/, '').split('-');
				const partialStart = parts[0];
				const partialEnd = parts[1];
				const start = parseInt(partialStart, 10);
				const end = partialEnd ? parseInt(partialEnd, 10) : total - 1;
				const chunkSize = end - start + 1;
				const file = fs.createReadStream(videoPath, { start, end });
				res.writeHead(206, {
					'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
					'Accept-Ranges': 'bytes',
					'Content-Length': chunkSize,
					'Content-Type': 'video/mp4',
				});
				file.pipe(res);
			} else {
				res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
				fs.createReadStream(videoPath).pipe(res);
			}
		} catch (error) {
			next(error);
		}
	}
	public async downloadFilm(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			const { email } = req.user;
			const { name } = req.body;
			const dir = `${Config.get('path')}${email}/${name}`;
			if (!fs.existsSync(dir)) throw new HttpException(400, 'No such file or directory');
			res.download(dir, name);
		} catch (error) {
			next(error);
		}
	}

	public async uploadFilm(req: RequestWithUser, res: Response, next: NextFunction) {
		try {
			await uploadUtil(req, res);
			if (req.files.length <= 0) throw new HttpException(400, 'Please choose a file or check your file type');
			const user = req.user;
			const files = req.files;
			// const data = DataService.newFileData(user, files);
			// await DataService.insert(data);
			return res.status(200).send({
				message: 'Uploaded files successfully ',
			});
		} catch (error) {
			next(error);
		}
	}
}

export default new FilmController();
