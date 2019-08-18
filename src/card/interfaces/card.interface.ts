import { Document } from 'mongoose';

export interface Card extends Document {
	_id: string;
	tag: string;
	state: object;
	commands: Array<{ _id: string; trigger: string }>;
}
