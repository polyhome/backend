import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandService } from './../../command';

@Controller('commands')
export class CommandController {
	constructor(private commandSvc: CommandService) {}

	/**
	 * @description - Executes a given command
	 *
	 * @param command - Command to execute
	 */
	@Post()
	execCommand(@Body() command) {
		this.commandSvc.exec(command);
	}

	/**
	 * @description - Returns either all Commands or those specified in the Query
	 *
	 * @param ids - Ids of Commands to return
	 */
	@Get()
	get(@Query('ids') ids) {
		if (ids) return this.commandSvc.findManyById(ids);
		return this.commandSvc.findAll();
	}

	/**
	 * @description - Gets Command specified by Id
	 *
	 * @param id - Id of Command to get
	 */
	@Get(':id')
	getOne(@Param('id') id) {
		this.commandSvc.findOneById(id);
	}
}
