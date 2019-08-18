import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileNames } from '../file';
import { MainService } from '../main.service';
import { Card } from './interfaces/card.interface';

@Injectable()
export class CardService extends MainService<Card> {
	@InjectModel('Card') model: Model<Card>;

	/**
	 * @description - Gets documents from files and synchronizes the database
	 */
	init(): void {
		super.init(FileNames.Cards);
	}

	/**
	 * @description - Starts watching files for changes
	 * @returns - Corresponding Actions to NGXS Store
	 */
	initFileWatch() {
		super.initFileWatch(FileNames.Cards);
		return {
			updatedEvent: '[Cards] Update Cards',
			deletedEvent: '[Cards] Delete Cards',
			createdEvent: '[Cards] Add Cards',
		};
	}
}
