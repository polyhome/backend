import { Module } from '@nestjs/common';
import { BoardModule } from '../board';
import { CardModule } from '../card';
import { CommandModule } from '../command/command.module';
import { ElementModule } from '../element/element.module';
import { GroupModule } from '../group';
import { BoardSocketController } from './controllers/board.socket-controller';
import { CardSocketController } from './controllers/card.socket-controller';
import { CommandSocketController } from './controllers/command.socket-controller';
import { ElementSocketController } from './controllers/element.socket-controller';
import { GroupSocketController } from './controllers/group.socket-controller';
import { EntryGateway } from './entry.gateway';
import { WebsocketService } from './websocket.service';

@Module({
	imports: [BoardModule, GroupModule, CardModule, ElementModule, CommandModule],
	providers: [
		EntryGateway,
		CardSocketController,
		GroupSocketController,
		ElementSocketController,
		CommandSocketController,
		BoardSocketController,
		WebsocketService,
	],
})
export class WebsocketModule {}
