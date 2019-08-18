import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from '../file';
import { BoardService } from './board.service';
import { BoardSchema } from './models/board.schema';

@Module({
	providers: [BoardService],
	imports: [
		FileModule,
		MongooseModule.forFeature([{ name: 'Board', schema: BoardSchema }]),
	],
	exports: [BoardService],
})
export class BoardModule {}
