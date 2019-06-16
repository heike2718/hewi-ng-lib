import { Injectable } from '@angular/core';
import { AuthResult, JWTService, AUTH_STATE_EMPTY, AUTH_STATE_SIGNUP, AUTH_STATE_LOGIN } from 'projects/hewi-ng-lib/src/public_api';
import { STORAGE_KEY_REFRESH_TOKEN, STORAGE_KEY_JWT, STORAGE_KEY_EXPIRES_AT, STORAGE_KEY_AUTH_STATE } from 'projects/hewi-ng-lib/src/public_api';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private jwtService: JWTService) { }

	parseHash(hash: string): void {

		// Am Ende nach success: (das wird in der URL hinter # zurückegeben)
		window.location.hash = '';

		const authResult: AuthResult = this.jwtService.parseHash(hash);
		if (authResult && authResult.state) {
			switch (authResult.state) {
				case AUTH_STATE_EMPTY: break;
				case AUTH_STATE_SIGNUP:
					this.setSession(authResult);
					break;
				case AUTH_STATE_LOGIN:
					this.setSession(authResult);
					break;
				default: break;
			}
		}
	}

	setSession(authResult: AuthResult) {
		// packen authResult ins LocalStorage, damit es ein refresh überlebt!
		if (authResult.refreshToken) {
			localStorage.setItem(STORAGE_KEY_REFRESH_TOKEN, authResult.refreshToken);
		}
		localStorage.setItem(STORAGE_KEY_JWT, authResult.idToken);
		localStorage.setItem(STORAGE_KEY_EXPIRES_AT, JSON.stringify(authResult.expiresAt));
		localStorage.setItem(STORAGE_KEY_AUTH_STATE, authResult.state);
	}


}
