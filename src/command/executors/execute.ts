import { Command } from '../../command';
export async function execute(req, command: Command) {
	const executor = await import('./' + command.protocol + '.executor');
	return executor.exec(req, command);
}
