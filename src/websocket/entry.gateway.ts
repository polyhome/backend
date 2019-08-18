import {
	OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
} from '@nestjs/websockets';
import { BoardSocketController } from './controllers/board.socket-controller';
import { CardSocketController } from './controllers/card.socket-controller';
import { CommandSocketController } from './controllers/command.socket-controller';
import { ElementSocketController } from './controllers/element.socket-controller';
import { GroupSocketController } from './controllers/group.socket-controller';
import { WebsocketService } from './websocket.service';

@WebSocketGateway()
export class EntryGateway implements OnGatewayConnection {
	constructor(
		private boardSocketCtrl: BoardSocketController,
		private websocketSvc: WebsocketService,
		private cardSocketCtrl: CardSocketController,
		private commandSocketCtrl: CommandSocketController,
		private elementSocketCtrl: ElementSocketController,
		private groupSocketCtrl: GroupSocketController,
	) {}

	handleConnection(client: any) {
		this.websocketSvc.addClient(client);
	}

	/*** BOARDS ***/

	@SubscribeMessage('boards/fetch-many')
	boardFetchMany(client: any, ids: string[]) {
		return this.boardSocketCtrl.fetchMany(ids);
	}

	@SubscribeMessage('boards/fetch-all')
	boardsFetchAll() {
		return this.boardSocketCtrl.fetchAll();
	}

	/*** CARDS ***/

	@SubscribeMessage('cards/fetch-many')
	cardFetchMany(client: any, ids: string[]) {
		return this.cardSocketCtrl.fetchMany(ids);
	}

	@SubscribeMessage('cards/fetch-one')
	cardFetchOne(client: any, id: string) {
		return this.cardSocketCtrl.fetchOne(id);
	}

	/*** COMMANDS ***/

	@SubscribeMessage('commands/exec')
	execCommand(client: any, command: any) {
		this.commandSocketCtrl.execCommand(command);
	}

	/*** ELEMENTS ***/

	@SubscribeMessage('elements/fetch-many')
	elementsFetchMany(client: any, ids: string[]) {
		return this.elementSocketCtrl.fetchMany(ids);
	}

	@SubscribeMessage('elements/fetch-one')
	elementsFetchOne(client: any, id: string) {
		return this.elementSocketCtrl.fetchOne(id);
	}

	/*** GROUPS ***/

	@SubscribeMessage('groups/fetch-one')
	groupsFetchOne(client: any, id: string) {
		return this.groupSocketCtrl.fetchOne(id);
	}
}
