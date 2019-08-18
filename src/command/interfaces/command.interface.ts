import { Document } from 'mongoose';

export interface Command extends Document {
	_id: string;
	protocol: string;
}
