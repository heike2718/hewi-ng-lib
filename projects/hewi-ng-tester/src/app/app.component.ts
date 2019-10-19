import { Component, OnInit } from '@angular/core';
import { MessagesService, STORAGE_KEY_JWT, STORAGE_KEY_JWT_STATE, JWTService, LogService } from 'projects/hewi-ng-lib/src/public_api';
import { ModalService } from 'projects/hewi-ng-lib/src/public_api';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	title = 'hewi-ng-tester';

	dialogTitle = '';

	btnDisabled = false;

	showDialog: boolean;

	jwt: string;

	loggedIn: boolean;

	tokenDurationMinutes: number;

	showJwt: boolean;


	constructor(private messagesService: MessagesService
		, private modalService: ModalService
		, private authService: AuthService
		, private jwtService: JWTService
		, private logger: LogService) { }

	ngOnInit() {

		this.logger.log('=== app about to init ====');

		this.showJwt = false;
		this.messagesService.message$.pipe(
			filter(
				_msg => !!undefined
			)
		).subscribe(
			msg => console.log('message erhalten: ' + msg.message)
		);

		// nach dem redirect vom AuthProvider ist das die Stelle, an der die Anwendung wieder ankommt.
		// Daher hier redirect-URL parsen
		this.authService.parseHash(window.location.hash);

		const j = localStorage.getItem(STORAGE_KEY_JWT);
		if (j) {
			this.jwt = j.substr(0, 20);
		} else {
			this.jwt = 'please call url with hash';
		}

		this.loggedIn = this.isLoggedIn();
		this.tokenDurationMinutes = 0;

		this.logger.log('=== app initialized ====');
	}


	openInfo() {
		console.log('click info');
		this.messagesService.info('This is a veeeerrrrrry loooooong Info. Everything is OK.');
	}


	openWarning() {
		this.messagesService.warn('This is a veeeerrrrrry loooooong Warning. Be careful!!!');
	}

	openError() {
		this.messagesService.error(' +++ OMG +++  Please reinstall universe and reboot.');
	}


	onClickOpenModal() {
		this.openModal();
	}

	private openModal(): void {
		this.showDialog = true;
		this.modalService.open();
	}


	closeModal() {
		this.modalService.close();
	}

	checkJWT() {
		this.loggedIn = this.isLoggedIn();
		this.tokenDurationMinutes = this.jwtService.jwtDurationMinutes();
		this.showJwt = true;
	}

	private isLoggedIn(): boolean {
		const authState = localStorage.getItem(STORAGE_KEY_JWT_STATE);
		if (authState && 'signup' === authState) {
			return false;
		}
		return !this.jwtService.isJWTExpired();
	}
}


