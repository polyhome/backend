import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Document, DocumentQuery, Model } from 'mongoose';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FileService } from './file';
import { FileNames } from './file/file-names.enum';
import { synchronize } from './helpers';

@Injectable()
export class MainService<T extends Document> implements OnModuleDestroy {
	end = new Subject();
	changeEvent = new Subject();

	model: Model<T>;

	constructor(public fileSvc: FileService) {}

	onModuleDestroy() {
		this.end.next();
		this.end.complete();
	}

	/**
	 * @description - Gets documents from files and synchronizes the database
	 *
	 * @param file - FileNames enum specyfing location of file
	 */
	init(file: FileNames): void {
		this.fileSvc.get(file).then(docs => {
			synchronize(this.model, docs)
				.then(newDocs => {
					this.changeEvent.next(newDocs);
				})
				.catch(err => {
					console.error(err);
				});
		});
	}

	findOneById(id: string): DocumentQuery<T, T, {}> {
		return this.model.findById(id);
	}

	findAll(): DocumentQuery<T[], T, {}> {
		return this.model.find({});
	}

	findManyById(ids: string[]): DocumentQuery<T[], T, {}> {
		return this.model.find({ _id: { $in: ids } });
	}

	findOneAndUpdate(doc: T) {
		this.model
			.findByIdAndUpdate(doc._id, doc, { new: true })
			.then(newDoc => {
				this.changeEvent.next({ updated: [newDoc] });
			})
			.catch(err => console.error(err));
	}

	initFileWatch(
		file?: FileNames,
	): { updatedEvent: string; deletedEvent: string; createdEvent: string } {
		this.fileSvc.changeEvent.pipe(takeUntil(this.end)).subscribe(event => {
			if (event === file) {
				console.log(event);
				this.init(file);
			}
		});
		return { updatedEvent: '', deletedEvent: '', createdEvent: '' };
	}
}
