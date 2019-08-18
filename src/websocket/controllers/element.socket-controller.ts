import { Injectable, OnModuleInit } from '@nestjs/common';
import { ElementService } from '../../element/element.service';
import { WebsocketService } from '../websocket.service';

@Injectable()
export class ElementSocketController implements OnModuleInit {
	constructor(
		private elementSvc: ElementService,
		private websocketSvc: WebsocketService,
	) {}

	onModuleInit() {
		if (!this.elementSvc) return;
		this.websocketSvc.initFileWatch(this.elementSvc);
	}

	/**
	 * @description - Fetches many Elements
	 *
	 * @param ids - Array of ids to fetch
	 */
	async fetchMany(ids: string[]) {
		return {
			type: '[Elements] Add Elements',
			docs: await this.elementSvc.findManyById(ids),
		};
	}

	/**
	 * @description - Fetches one Element
	 *
	 * @param id - Id of Element to fetch
	 */
	async fetchOne(id: string) {
		return {
			type: '[Elements] Add Element',
			doc: await this.elementSvc.findOneById(id),
		};
	}
}
