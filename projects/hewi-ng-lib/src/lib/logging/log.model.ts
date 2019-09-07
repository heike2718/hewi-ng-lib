export enum LogLevel {
	All = 0,
	Debug = 1,
	Info = 2,
	Warn = 3,
	Error = 4,
	Fatal = 5,
	Off = 6
}

export class LogEntry {

	private timestamp: number;
	private clientAccessToken: string;
	private message: string;
	private level: LogLevel;

	constructor(msg: string, l: LogLevel, at?: string) {
		this.timestamp = new Date().getTime();
		this.message = msg;
		this.level = l;
		this.clientAccessToken = at ? at : 'unknown';
	}

	createLogString(): string {
		let value = this.timestamp + ' - ';

		value += 'Type: ' + LogLevel[this.level];
		value += 'clientAT: ' + this.clientAccessToken;
		value += 'Message: ' + this.message;

		return value;
	}
}
