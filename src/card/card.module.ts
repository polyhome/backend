import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from '../file';
import { CardService } from './card.service';
import { CardSchema } from './models/card.schema';

@Module({
	providers: [CardService],
	imports: [
		FileModule,
		MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }]),
	],
	exports: [CardService],
})
export class CardModule {}
