import { Schema } from 'mongoose';

export const CardSchema = new Schema({
	_id: String,
	__v: { type: Number, select: false },
	tag: String,
	state: {},
	commands: [{ _id: String, trigger: String }],
});
