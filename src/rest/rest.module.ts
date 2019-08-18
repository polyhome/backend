import { Module } from '@nestjs/common';
import { BoardModule } from './../board';
import { CardModule } from './../card/card.module';
import { CommandModule } from './../command/command.module';
import { ElementModule } from './../element/element.module';
import { GroupModule } from './../group';
import { BoardController } from './controllers/board.controller';
import { CardController } from './controllers/card.controller';
import { CommandController } from './controllers/command.controller';
import { ElementController } from './controllers/element.controller';
import { GroupController } from './controllers/group.controller';

@Module({
	imports: [BoardModule, CardModule, CommandModule, ElementModule, GroupModule],
	controllers: [
		BoardController,
		CardController,
		CommandController,
		ElementController,
		GroupController,
	],
})
export class RestModule {}
