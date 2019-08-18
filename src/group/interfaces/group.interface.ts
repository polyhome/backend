import { Document } from 'mongoose';

export interface Group extends Document {
	_id: string;
	classes: string[];
	cards: Array<{ _id: string; classes: string[]; position: number }>;
}
