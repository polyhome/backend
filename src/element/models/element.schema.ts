import { Schema } from 'mongoose';

export const ElementSchema = new Schema({
	_id: String,
	__v: { type: Number, select: false },
	url: String,
	srcType: String,
	state: Object,
	triggers: [String],
	commands: [Object],
});
