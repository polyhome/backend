import { Controller, Get, Param, Query } from '@nestjs/common';
import { CardService } from './../../card';

@Controller('cards')
export class CardController {
	constructor(private cardSvc: CardService) {}

	/**
	 * @description - Returns either all Cards or those specified in the Query
	 *
	 * @param ids - Ids of Card to return
	 */
	@Get()
	get(@Query('ids') ids) {
		if (ids) return this.cardSvc.findManyById(ids);
		return this.cardSvc.findAll();
	}

	/**
	 * @description - Gets Card specified by Id
	 *
	 * @param id - Id of Card to get
	 */
	@Get(':id')
	getOne(@Param('id') id) {
		return this.cardSvc.findOneById(id);
	}
}
