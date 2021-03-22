import { Document } from 'mongoose';

export type FilmDocument = {
	name: string;
	code: string;
	year: Date;
	actor: string[];
	file?: string;
	info: any;
};

export interface IFilmDocument extends Document, FilmDocument {}
