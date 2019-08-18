import { Document } from 'mongoose';

export interface Element extends Document {
	_id: string;
	url: string;
	srcType: string;
	state: object;
	triggers: string[];
	commands: object[];
}
