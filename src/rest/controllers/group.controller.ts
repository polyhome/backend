import { Controller, Get, Param, Query } from '@nestjs/common';
import { GroupService } from '../../group';

@Controller('groups')
export class GroupController {
	constructor(private groupSvc: GroupService) {}

	/**
	 * @description - Returns either all Groups or those specified in the Query
	 *
	 * @param ids - Ids of Groups to return
	 */
	@Get()
	get(@Query('ids') ids) {
		if (ids) return this.groupSvc.findManyById(ids);
		return this.groupSvc.findAll();
	}

	/**
	 * @description - Gets Group specified by Id
	 *
	 * @param id - Id of Group to get
	 */
	@Get(':id')
	getOne(@Param('id') id) {
		return this.groupSvc.findOneById(id);
	}
}
