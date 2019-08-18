import { Injectable, OnModuleInit } from '@nestjs/common';
import { CardService } from '../../card';
import { WebsocketService } from '../websocket.service';

@Injectable()
export class CardSocketController implements OnModuleInit {
	constructor(
		private cardSvc: CardService,
		private websocketSvc: WebsocketService,
	) {}

	onModuleInit() {
		if (!this.cardSvc) return;
		this.websocketSvc.initFileWatch(this.cardSvc);
	}

	/**
	 * @description - Fetches a given Card
	 *
	 * @param id - Id of Card to fetch
	 */
	async fetchOne(id: string) {
		return {
			type: '[Cards] Add Card',
			doc: await this.cardSvc.findOneById(id),
		};
	}

	/**
	 * @description - Fetches many Cards
	 *
	 * @param ids - Array of ids to fetch
	 */
	async fetchMany(ids: string[]) {
		return {
			type: '[Cards] Add Cards',
			docs: await this.cardSvc.findManyById(ids),
		};
	}
}
