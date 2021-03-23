import { Schema, Model, model } from 'mongoose';
import { IActorDocument, ActorGender } from '../interfaces/actor.interface';
import { schemaOption } from './user.model';
import { getAge } from '../utils/age';

interface IActor extends IActorDocument {
	// methods here
	getAge(): number;
}

interface IActorModel extends Model<IActor> {
	// statics here. it's required
	getActorByAge(): Promise<IActorDocument[]>;
}

const ActorSchema: Schema = new Schema(
	{
		_id: Schema.Types.ObjectId,
		name: String,
		gender: { type: String, enum: Object.values(ActorGender) },
		nation: String,
		Dob: Date,
		info: [String],
		films: [String],
	},
	schemaOption
);

ActorSchema.methods.getAge = function (this: IActor): number {
	return getAge(this.Dob.toDateString());
};

ActorSchema.statics.getActorByAge = async function getActorByAge(age: number): Promise<IActorDocument[]> {
	const result = [];
	const actors = await Actor.find({});
	actors.forEach((actor) => {
		if (getAge(actor.Dob.toDateString()) === age) result.push(actor);
	});
	return result;
};

const Actor: IActorModel = model<IActor, IActorModel>('Actor', ActorSchema);
export default Actor;
