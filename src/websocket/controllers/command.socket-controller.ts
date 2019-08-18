import { Injectable, OnModuleInit } from '@nestjs/common';
import { WebsocketService } from '../websocket.service';
import { CommandService } from './../../command/command.service';

@Injectable()
export class CommandSocketController implements OnModuleInit {
	constructor(
		private commandSvc: CommandService,
		private websocketSvc: WebsocketService,
	) {}

	onModuleInit() {
		if (!this.commandSvc) return;
		this.websocketSvc.initFileWatch(this.commandSvc);
	}

	/**
	 * @description - Passes the request onto the service
	 *
	 * @param command - Command to be executed
	 */
	execCommand(command: any) {
		this.commandSvc.exec(command);
	}
}
