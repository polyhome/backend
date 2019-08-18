import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileNames } from '../file';
import { MainService } from '../main.service';
import { Board } from './interfaces/board.interface';

@Injectable()
export class BoardService extends MainService<Board> {
	@InjectModel('Board') model: Model<Board>;

	/**
	 * @description - Gets documents from files and synchronizes the database
	 */
	init(): void {
		super.init(FileNames.Boards);
	}

	/**
	 * @description - Starts watching files for changes
	 * @returns - Corresponding Actions to NGXS Store
	 */
	initFileWatch() {
		super.initFileWatch(FileNames.Boards);
		return {
			updatedEvent: '[Boards] Update Boards',
			deletedEvent: '[Boards] Delete Boards',
			createdEvent: '[Boards] Add Boards',
		};
	}
}
