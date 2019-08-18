import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardModule } from '../card';
import { FileModule } from '../file';
import { CommandService } from './command.service';
import { CommandSchema } from './models/command.schema';
import { HTTPCommandSchema } from './models/http-command.schema';

@Module({
	providers: [CommandService],
	imports: [
		MongooseModule.forFeature([
			{
				name: 'Command',
				schema: CommandSchema,
				collection: 'commands',
			},
			{
				name: 'HTTPCommand',
				schema: HTTPCommandSchema,
				collection: 'commands',
			},
		]),
		FileModule,
		CardModule,
	],
	exports: [CommandService],
})
export class CommandModule {}
