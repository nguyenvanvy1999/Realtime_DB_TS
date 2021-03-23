import { Schema, Model, model } from 'mongoose';
import { IFilmDocument } from '../interfaces/film.interface';
import { IActorDocument } from '../interfaces/actor.interface';
import Actor from './actor.model';
import { schemaOption } from './user.model';

interface IFilm extends IFilmDocument {
	getActor(): Promise<IActorDocument[]>;
}

interface IFilmModel extends Model<IFilm> {
	// statics here
}

const FilmSchema: Schema = new Schema(
	{
		_id: Schema.Types.ObjectId,
		actor: [{ type: Schema.Types.ObjectId, ref: 'Actor' }],
		code: { type: String, unique: true },
		year: Date,
		file: String,
		info: [String],
	},
	schemaOption
);

FilmSchema.methods.getActor = async function (this: IFilm): Promise<IActorDocument[]> {
	return await Actor.find({ _id: { $in: this.actor } });
};

const Film: IFilmModel = model<IFilm, IFilmModel>('Film', FilmSchema);
export default Film;
