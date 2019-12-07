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
	private message: string;
	private level: LogLevel;

	constructor(msg: string, l: LogLevel) {
		this.timestamp = new Date().getTime();
		this.message = msg;
		this.level = l;
	}

	public getLevel(): string {
		switch (this.level) {
			case 0: return 'ALL';
			case 1: return 'DEBUG';
			case 2: return 'INFO';
			case 3: return 'WARN';
			case 4: return 'ERROR';
			case 5: return 'FATAL';
			default: return '';
		}
	}

	public getMessage(): string {
		return this.message;
	}

	public getTimestamp(): number {
		return this.timestamp;
	}
}
