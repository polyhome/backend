import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileNames } from '../file';
import { synchronize } from '../helpers';
import { MainService } from '../main.service';
import { Group } from './interfaces/group.interface';

@Injectable()
export class GroupService extends MainService<Group> {
	@InjectModel('Group') model: Model<Group>;

	/**
	 * Synchronizes data from config file with database
	 */
	init(): void {
		this.fileSvc.get(FileNames.Groups).then(groups => {
			groups.forEach(group => {
				for (let i = 0; i < group.cards.length; i++) {
					group.cards[i].position = i;
				}
			});
			synchronize(this.model, groups).then(change => {
				this.changeEvent.next(change);
			});
		});
	}

	/**
	 * Initialises file watching
	 */
	initFileWatch() {
		super.initFileWatch(FileNames.Groups);
		return {
			updatedEvent: '[Groups] Update Groups',
			deletedEvent: '[Groups] Delete Groups',
			createdEvent: '[Groups] Add Groups',
		};
	}
}
