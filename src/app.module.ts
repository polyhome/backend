import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule, BoardService } from './board';
import { CardModule, CardService } from './card';
import { CommandModule, CommandService } from './command';
import { ElementModule, ElementService } from './element';
import { FileModule } from './file';
import { FileService } from './file/file.service';
import { GroupModule, GroupService } from './group';
import { MainService } from './main.service';
import { RestModule } from './rest';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
	imports: [
		WebsocketModule,
		BoardModule,
		MongooseModule.forRoot(process.env.MONGO_CONN_STRING || '', {
			useNewUrlParser: true,
			useFindAndModify: false,
		}),
		GroupModule,
		FileModule,
		CardModule,
		CommandModule,
		ElementModule,
		RestModule,
	],
	controllers: [AppController],
	providers: [AppService, MainService],
	exports: [],
})
export class AppModule implements OnModuleInit {
	constructor(
		private groupSvc: GroupService,
		private boardSvc: BoardService,
		private cardSvc: CardService,
		private commandSvc: CommandService,
		private elementSvc: ElementService,
		private fileSvc: FileService,
	) {}

	onModuleInit() {
		this.groupSvc.init();
		this.boardSvc.init();
		this.cardSvc.init();
		this.commandSvc.init();
		this.elementSvc.init();
		this.fileSvc.initFileWatch();
	}
}
