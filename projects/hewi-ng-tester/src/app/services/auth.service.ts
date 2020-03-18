import { Injectable } from '@angular/core';
import { AuthResult, JWTService } from 'projects/hewi-ng-lib/src/public_api';

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
				default: break;
			}
		}
	}

	setSession(authResult: AuthResult) {
		// packen authResult ins LocalStorage, damit es ein refresh überlebt!
		localStorage.setItem('STORAGE_KEY_JWT', authResult.idToken);
		localStorage.setItem('STORAGE_KEY_JWT_EXPIRES_AT', JSON.stringify(authResult.expiresAt));
		localStorage.setItem('STORAGE_KEY_JWT_STATE', authResult.state);
	}

}
