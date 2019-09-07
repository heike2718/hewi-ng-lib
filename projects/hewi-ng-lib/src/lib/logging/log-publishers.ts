import { Observable, of } from 'rxjs';
import { LogEntry } from './log.model';
import { HttpClient } from '@angular/common/http';
import { map, publishLast, refCount } from 'rxjs/operators';
import { ResponsePayload } from '../messages/models/message.model';

export abstract class LogPublisher {
	location: string;

	abstract log(record: LogEntry): Observable<boolean>;
	abstract clear(): Observable<boolean>;
}

export class LogConsole extends LogPublisher {

	log(entry: LogEntry): Observable<boolean> {
		console.log(entry.createLogString());
		return of(true);
	}

	clear(): Observable<boolean> {
		console.clear();
		return of(true);
	}
}

export class LogWebApi extends LogPublisher {

	constructor(private http: HttpClient, private url: string) {
		super();
	}


	log(entry: LogEntry): Observable<boolean> {

		this.http.post(this.url, entry).pipe(
			map(res => <ResponsePayload>res),
			publishLast(),
			refCount()
		).subscribe(
			() => {
				return of(true);
			},
			((error) => {
				this.handleErrors(error);
				return of(true);
			}));

		return of(true);
	}

	clear(): Observable<boolean> {
		// nothing to remove from serverlog
		return of(true);
	}

	private handleErrors(error: any): void {
		const errors: string[] = [];
		let msg = '';

		msg = 'Status: ' + error.status;
		msg += ' - Status Text: ' + error.statusText;
		errors.push(msg);

		console.error('Unerwarteter Fehler beim POST eines Client-Errors: ', errors);
	}

}

