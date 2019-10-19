import { Injectable } from '@angular/core';
import { LogPublisher, LogConsole } from 'projects/hewi-ng-lib/src/public_api';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LogPublishersService {

	publishers: LogPublisher[] = [];

	constructor() {

		this.buildPublishers();
	}


	private buildPublishers(): void {

		if (environment.consoleLogActive) {
			this.publishers.push(new LogConsole());
		}
	}
}
