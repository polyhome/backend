import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MainService } from 'src/main.service';
@Injectable()
export class WebsocketService implements OnModuleDestroy {
	end = new Subject();
	clients: any[] = [];

	onModuleDestroy() {
		this.end.next();
		this.end.complete();
	}

	/**
	 * @description - Adds client to array of clients
	 *
	 * @param client - Client to add
	 */
	addClient(client: any) {
		this.clients.push(client);
	}

	/**
	 * @description - Emits file changes to clients
	 *
	 * @param change - Change that needs to be emitted
	 * @param events - Different types of events
	 */
	emitChanges(change, events) {
		this.clients.forEach(client => {
			Object.keys(change).forEach(key => {
				if (change[key] && change[key].length !== 0) {
					client.send(
						JSON.stringify({
							type: events[key + 'Event'],
							docs: change[key],
						}),
					);
				}
			});
		});
	}

	/**
	 * @description - Initializes file watching in a given service
	 *
	 * @param svc - Service to initialize file changes with
	 */
	initFileWatch(svc: MainService<any>) {
		const events = svc.initFileWatch();
		svc.changeEvent.pipe(takeUntil(this.end)).subscribe((change: any) => {
			this.emitChanges(change, events);
		});
	}
}
