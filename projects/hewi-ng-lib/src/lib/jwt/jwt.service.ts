import * as moment_ from 'moment';
import { Injectable } from '@angular/core';
import { AuthResult, AUTH_STATE_EMPTY, AUTH_STATE_LOGIN, STORAGE_KEY_EXPIRES_AT, STORAGE_KEY_AUTH_STATE } from './jwt.model';

const moment = moment_;

@Injectable({
	providedIn: 'root'
})
export class JWTService {

	constructor() { }


	public parseHash(hashStr: string): AuthResult {

		hashStr = hashStr.replace(/^#?\/?/, '');

		const result: AuthResult = { state: AUTH_STATE_EMPTY };

		if (hashStr.length > 0) {

			const tokens = hashStr.split('&');
			tokens.forEach(
				(token) => {
					const keyVal = token.split('=');
					switch (keyVal[0]) {
						case 'accessToken': result.accessToken = keyVal[1]; break;
						case 'refreshToken': result.refreshToken = keyVal[1]; break;
						case 'expiresAt': result.expiresAt = JSON.parse(keyVal[1]); break;
						case 'tokenType': result.tokenType = keyVal[1]; break;
						case 'state': result.state = keyVal[1]; break;
						case 'nonce': result.nonce = keyVal[1]; break;
						case 'idToken': result.idToken = keyVal[1]; break;
					}
				}
			);
		}
		return result;
	}


	private getExpirationAsMoment() {
		if (!localStorage.getItem(STORAGE_KEY_EXPIRES_AT)) {
			return null;
		}
		const expiration = localStorage.getItem(STORAGE_KEY_EXPIRES_AT);
		const expiresAt = JSON.parse(expiration) * 1000;
		return moment(expiresAt);
	}

	/** Eingelogged ist man, wenn man ein gültiges JWT hat und der auth_state login ist (nicht signUp!)*/
	public isLoggedIn(): boolean {
		const authState = localStorage.getItem(STORAGE_KEY_AUTH_STATE);
		if (!authState || authState !== AUTH_STATE_LOGIN) {
			return false;
		}
		const expiration = this.getExpirationAsMoment();
		if (expiration === null) {
			return false;
		}
		return moment().isBefore(expiration);
	}

	/** Gibt die Gültigkeit des JWT ab jetzt in Minuten an */
	public jwtDurationMinutes(): number {
		const expiration = this.getExpirationAsMoment();
		if (expiration === null) {
			return 0;
		}

		const now = moment();
		const diff = expiration.diff(now, 'minutes', false);
		console.log('now: ' + JSON.stringify(now.toObject()) + ', JWT expires at ' + JSON.stringify(expiration.toObject()));
		console.log('Diff in minutes: ' + diff);

		return diff;
	}

	public getLoginUrl(authUrl: string, accessToken: string, redirectUrl: string, state: string, nonce: string) {
		return authUrl + '#/login?accessToken=' + accessToken + '&redirectUrl=' + redirectUrl + '&state=' + state + '&nonce=' + nonce;
	}

	public getSignupUrl(authUrl: string, accessToken: string, redirectUrl: string, state: string, nonce: string) {
		return authUrl + '#/signup?accessToken=' + accessToken + '&redirectUrl=' + redirectUrl + '&state=' + state + '&nonce=' + nonce;
	}
}
