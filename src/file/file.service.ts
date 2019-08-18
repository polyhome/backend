import { Injectable } from '@nestjs/common';
import { watch } from 'chokidar';
import { readJson } from 'fs-extra';
import { Subject } from 'rxjs';
import { FileNames } from './file-names.enum';

@Injectable()
export class FileService {
	/**
	 * @description - Keeps track of changes to files
	 *
	 * @emits - Change to files
	 */
	changeEvent = new Subject();

	/**
	 * @description - Get contents of a file
	 *
	 * @param file - File to get contents of
	 * @returns - Promise containing contents of specified file
	 */
	get(file: FileNames): Promise<any[]> {
		return this.readFile(file);
	}

	/**
	 * @description - Reads content from file
	 *
	 * @remarks - This function runs recursively, due to the fact that the readJson
	 * at times throws an error, even when nothing is wrong with the file.
	 */
	async readFile(file: FileNames, num: number = 0) {
		if (num > 5) return [];
		let docs = [];
		try {
			docs = await readJson(file);
		} catch (error) {
			docs = await this.readFile(file, num);
		}
		return docs;
	}

	/**
	 * Initialises file watch
	 */
	initFileWatch() {
		const watcher = watch(FileNames.Config + '*.json');
		let lastFire = Date.now();
		watcher.on('change', event => {
			if (lastFire + 100 > Date.now()) return;
			lastFire = Date.now();
			this.changeEvent.next(event);
		});
	}
}
