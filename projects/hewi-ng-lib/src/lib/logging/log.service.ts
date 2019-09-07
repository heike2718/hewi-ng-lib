import { Injectable } from '@angular/core';
import { LogLevel, LogEntry } from './log.model';
import { LogPublishersService } from './log-publishers.service';
import { LogPublisher } from './log-publishers';
import { STORAGE_KEY_CLIENT_ACCESS_TOKEN } from '../shared/model/oauth.model';

@Injectable({
	providedIn: 'root'
})
export class LogService {

	level: LogLevel;
	private publishers: LogPublisher[];



	constructor(private publishersService: LogPublishersService) {
		this.level = LogLevel.All;
		this.publishers = this.publishersService.publishers;
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

	private writeToLog(msg: string, level: LogLevel, accessToken: string) {
		if (this.shouldLog(level)) {

			const timestamp = new Date().getTime();

			const entry = new LogEntry(timestamp, msg, level, accessToken);

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

