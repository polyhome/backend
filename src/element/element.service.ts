import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Axios from 'axios';
import { Model } from 'mongoose';
import { FileNames } from '../file';
import { synchronize } from '../helpers';
import { MainService } from '../main.service';
import { Element } from './interfaces/element.interface';

@Injectable()
export class ElementService extends MainService<Element> {
	@InjectModel('Element') model: Model<Element>;

	/**
	 * @description - Gets Elements from config file, and synchronizes it with the database
	 */
	async init(): Promise<void> {
		const elementsFromFile = await this.fileSvc.get(FileNames.Elements);
		Promise.all(
			elementsFromFile.map(async url => {
				const req = await Axios.get(url + 'manifest.json');
				return {
					_id: req.data._id,
					url,
					srcType: req.data.srcType,
					state: req.data.state || {},
					triggers: req.data.triggers || [],
					commands: req.data.commands || [],
				};
			}),
		).then(elements => {
			synchronize(this.model, elements as Element[]).then(change => {
				this.changeEvent.next(change);
			});
		});
	}

	/**
	 * Initialises file watching
	 */
	initFileWatch() {
		super.initFileWatch(FileNames.Elements);
		return {
			updatedEvent: '[Elements] Update Elements',
			deletedEvent: '[Elements] Delete Elements',
			createdEvent: '[Elements] Add Elements',
		};
	}
}
