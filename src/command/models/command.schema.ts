import { Schema } from 'mongoose';

export const CommandTemplate = {
	_id: String,
	__v: { type: Number, select: false },
	protocol: String,
};

export const CommandSchema = new Schema(CommandTemplate, { strict: false });
