import { Command } from '../interfaces/command.interface';

export interface HTTPCommand extends Command {
	url: string;
	verb: string;
	params: object;
	headers: object;
	body: object;
}
