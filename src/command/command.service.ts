import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Axios from 'axios';
import { Model } from 'mongoose';
import { Card } from '../card';
import { FileNames, FileService } from '../file';
import { MainService } from '../main.service';
import { CardService } from './../card/card.service';
import { execute } from './executors/execute';
import { Command } from './interfaces/command.interface';
import { HTTPCommand } from './interfaces/http-command.interface';

@Injectable()
export class CommandService extends MainService<Command> {
	@InjectModel('Command') model: Model<Command>;

	constructor(public fileSvc: FileService, private cardSvc: CardService) {
		super(fileSvc);
	}

	/**
	 * @description - Gets documents from files and synchronizes the database
	 */
	init(): void {
		super.init(FileNames.Commands);
	}

	/**
	 * @description - Executes a given command, and changes a cards state if neeed
	 * @param req - Contains information about command to execute
	 */
	async exec(req: any): Promise<void> {
		const command = await this.model.findOne({ _id: req.command }).lean();

		execute(req, command).then(() => {});

		this.cardSvc.findOneById(req.card).then(card => {
			this.updateCard(card, req.state);
		});
	}

	/**
	 * @description - Updates card with supplied state
	 * @param card - Card to be updated
	 * @param state - Object containing values to replace
	 */
	updateCard(card: Card, state: object) {
		if (state) {
			Object.keys(state).forEach(k => {
				if (typeof state[k] === 'boolean') {
					card.state[k] = !!state[k];
				} else if (
					state[k].toLowerCase() === 'true' ||
					state[k].toLowerCase() === 'false'
				) {
					card.state[k] = state[k] === 'true';
				} else if (state[k] === 'toggle') {
					card.state[k] = !card.state[k];
				} else {
					card.state[k] = state[k];
				}
			});
			this.cardSvc.findOneAndUpdate(card);
		}
	}

	/**
	 * @description - Starts watching files for changes
	 *
	 * @returns - Corresponding Actions to NGXS Store
	 */
	initFileWatch() {
		super.initFileWatch(FileNames.Commands);
		return {
			updatedEvent: '[Commands] Update Commands',
			deletedEvent: '[Commands] Delete Commands',
			createdEvent: '[Commands] Add Commands',
		};
	}
}

/**
 * @description - Executes a given Command
 *
 * @param req - Contains possible overwritten values of Command
 * @param command - Command to execute
 */
function executeHTTP(req: any, command: HTTPCommand) {
	return Axios.request({
		url: req.url || command.url,
		method: req.method || command.verb || 'GET',
		params: req.params || command.params || '',
		headers: req.headers || command.headers || '',
		data: req.body || command.body || '',
	});
}
