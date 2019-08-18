import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from '../file';
import { ElementService } from './element.service';
import { ElementSchema } from './models/element.schema';

@Module({
	providers: [ElementService],
	exports: [ElementService],
	imports: [
		FileModule,
		MongooseModule.forFeature([
			{
				name: 'Element',
				schema: ElementSchema,
			},
		]),
	],
})
export class ElementModule {}
