import { Controller, Get, Param, Query } from '@nestjs/common';
import { ElementService } from '../../element';

@Controller('elements')
export class ElementController {
	constructor(private elementSvc: ElementService) {}

	/**
	 * @description - Returns either all Elements or those specified in the Query
	 *
	 * @param ids - Ids of Elements to return
	 */
	@Get()
	get(@Query('ids') ids) {
		if (ids) return this.elementSvc.findManyById(ids);
		return this.elementSvc.findAll();
	}

	/**
	 * @description - Gets Element specified by Id
	 *
	 * @param id - Id of Element to get
	 */
	@Get(':id')
	getOne(@Param('id') id) {
		return this.elementSvc.findOneById(id);
	}
}
