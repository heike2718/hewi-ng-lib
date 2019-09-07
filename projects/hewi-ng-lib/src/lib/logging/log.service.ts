import { Injectable } from '@angular/core';
import { LogLevel, LogEntry } from './log.model';
import { LogPublisher } from './log-publishers';

@Injectable({
	providedIn: 'root'
})
export class LogService {

	private level: LogLevel;
	private publishers: LogPublisher[];

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
		console.log(new Date() + ': ' + JSON.stringify(msg));
	}

	public registerPublishers(publishers: LogPublisher[]) {
		this.publishers = publishers;
	}

	public setLevel(level: LogLevel): LogService {
		this.level = level;
		return this;
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

