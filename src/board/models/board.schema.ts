import * as mongoose from 'mongoose';

export const BoardSchema = new mongoose.Schema({
	_id: String,
	title: String,
	icon: String,
	groups: [{ _id: String, position: Number }],
	position: Number,
	__v: { type: Number, select: false },
});
