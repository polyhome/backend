import { Injectable, OnModuleInit } from '@nestjs/common';
import { GroupService } from '../../group/group.service';
import { WebsocketService } from '../websocket.service';

@Injectable()
export class GroupSocketController implements OnModuleInit {
	constructor(
		private groupSvc: GroupService,
		private websocketSvc: WebsocketService,
	) {}

	onModuleInit() {
		if (!this.groupSvc) return;
		this.websocketSvc.initFileWatch(this.groupSvc);
	}

	/**
	 * @description - Fetches one Group
	 *
	 * @param id - Id of Group to fetch
	 */
	async fetchOne(id: string) {
		return {
			type: '[Groups] Add Group',
			doc: await this.groupSvc.findOneById(id),
		};
	}
}
