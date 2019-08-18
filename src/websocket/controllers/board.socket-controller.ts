import { Injectable, OnModuleInit } from '@nestjs/common';
import { BoardService } from '../../board';
import { WebsocketService } from '../websocket.service';

@Injectable()
export class BoardSocketController implements OnModuleInit {
	constructor(
		private boardSvc: BoardService,
		private websocketSvc: WebsocketService,
	) {}

	onModuleInit() {
		if (!this.boardSvc) return;
		this.websocketSvc.initFileWatch(this.boardSvc);
	}

	/**
	 * @description - Fetches many Boards
	 *
	 * @param ids - Array of ids to fetch
	 */
	async fetchMany(ids: string[]) {
		return {
			type: '[Boards] Add Boards',
			docs: await this.boardSvc.findManyById(ids),
		};
	}

	/**
	 * @description - Fetches all Boards
	 */
	async fetchAll() {
		return {
			type: '[Boards] Add Boards',
			docs: await this.boardSvc.findAll(),
		};
	}
}
