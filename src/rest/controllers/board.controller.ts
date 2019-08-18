import { Controller, Get, Param, Query } from '@nestjs/common';
import { BoardService } from './../../board';

@Controller('boards')
export class BoardController {
	constructor(private boardSvc: BoardService) {}

	/**
	 * @description - Returns either all Boards or those specified in the Query
	 *
	 * @param ids - Ids of Board to return
	 */
	@Get()
	get(@Query('ids') ids) {
		if (ids) return this.boardSvc.findManyById(ids);
		return this.boardSvc.findAll();
	}

	/**
	 * @description - Gets Board specified by Id
	 *
	 * @param id - Id of Board to get
	 */
	@Get(':id')
	getOne(@Param('id') id) {
		return this.boardSvc.findOneById(id);
	}
}
