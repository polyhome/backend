import Axios from 'axios';
import { HTTPCommand } from '../interfaces/http-command.interface';

export function exec(req, command: HTTPCommand) {
	return Axios.request({
		url: req.url || command.url,
		method: req.method || command.verb || 'GET',
		params: req.params || command.params || '',
		headers: req.headers || command.headers || '',
		data: req.body || command.body || '',
	});
}
