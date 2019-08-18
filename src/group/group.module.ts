import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from '../file';
import { GroupService } from './group.service';
import { GroupSchema } from './models/group.schema';

@Module({
	providers: [GroupService],
	imports: [
		MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]),
		FileModule,
	],
	exports: [GroupService],
})
export class GroupModule {}
