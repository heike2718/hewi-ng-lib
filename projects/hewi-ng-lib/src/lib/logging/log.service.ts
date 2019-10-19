import { Injectable } from '@angular/core';
import { LogLevel, LogEntry } from './log.model';
import { LogPublisher } from './log-publishers';

@Injectable({
	providedIn: 'root'
})
export class LogService {

	private level: LogLevel;
	private publishers: LogPublisher[];

	private dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

	constructor() {
		this.level = LogLevel.Error;
	}

	debug(msg: string, accessToken: string) {
		this.writeToLog(msg, LogLevel.Debug, accessToken);
	}

	info(msg: string, accessToken: string) {
		this.writeToLog(msg, LogLevel.Info, accessToken);
	}

	warn(msg: string, accessToken: string) {
		this.writeToLog(msg, LogLevel.Warn, accessToken);
	}

	error(msg: string, accessToken: string) {
		this.writeToLog(msg, LogLevel.Error, accessToken);
	}

	fatal(msg: string, accessToken: string) {
		this.writeToLog(msg, LogLevel.Fatal, accessToken);
	}

	log(msg: any) {
		console.log(new Date().toLocaleString('de-DE') + ': ' + JSON.stringify(msg));
	}

	public registerPublishers(publishers: LogPublisher[]) {
		this.publishers = publishers;
	}

	public initLevel(level: number): void {
		switch (level) {
			case 0: this.level = LogLevel.All; break;
			case 1: this.level = LogLevel.Debug; break;
			case 2: this.level = LogLevel.Info; break;
			case 3: this.level = LogLevel.Warn; break;
			case 4: this.level = LogLevel.Error; break;
			case 5: this.level = LogLevel.Fatal; break;
			case 6: this.level = LogLevel.Off; break;
			default: this.level = LogLevel.Error;
		}
	}

	private writeToLog(msg: string, level: LogLevel, accessToken: string) {
		if (this.shouldLog(level)) {

			const entry = new LogEntry(msg, level, accessToken);

			for (const publisher of this.publishers) {
				publisher.log(entry)
					.subscribe(_response => console.log(_response));
			}
		}
	}

	private shouldLog(level: LogLevel): boolean {
		let ret = false;
		if ((level >= this.level &&
			level !== LogLevel.Off) ||
			this.level === LogLevel.All) {
			ret = true;
		}
		return ret;
	}
}

