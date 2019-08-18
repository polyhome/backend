import { Document } from 'mongoose';

export interface Board extends Document {
	_id: string;
	title: string;
	icon: string;
	groups: Array<{ _id: string; position: number }>;
	position: number;
}
