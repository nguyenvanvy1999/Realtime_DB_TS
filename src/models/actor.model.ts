import { Schema, Model, model } from 'mongoose';
import { IActorDocument, ActorGender } from '../interfaces/actor.interface';
import { schemaOption } from './user.model';

interface IActor extends IActorDocument {
	// methods here
	fullName(): string;
}

interface IActorModel extends Model<IActor> {
	// statics here
}

const ActorSchema: Schema = new Schema(
	{
		_id: Schema.Types.ObjectId,
		firstName: String,
		lastName: String,
		gender: { type: String, enum: Object.values(ActorGender) },
		nation: String,
		Dob: Date,
		info: [String],
		films: [String],
	},
	schemaOption
);

ActorSchema.methods.fullName = function (this: IActor): string {
	return this.firstName + ' ' + this.lastName;
};

const Actor: IActorModel = model<IActor, IActorModel>('Actor', ActorSchema);
export default Actor;
