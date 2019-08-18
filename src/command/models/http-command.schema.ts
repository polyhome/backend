import { Schema } from 'mongoose';
import { CommandTemplate } from './command.schema';

export const HTTPCommandSchema = new Schema({
	...CommandTemplate,
	url: String,
	verb: String,
	params: {},
	headers: {},
	body: {},
});
