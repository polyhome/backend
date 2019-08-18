import { Schema } from 'mongoose';

export const GroupSchema = new Schema({
	_id: String,
	classes: [String],
	cards: [{ _id: String, classes: [String], position: Number }],
	__v: { type: Number, select: false },
});
