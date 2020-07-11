import { Injectable } from '@angular/core';
import { AuthResult } from './jwt.model';

@Injectable({
	providedIn: 'root'
})
export class JWTService {

	constructor() { }


	public parseHash(hashStr: string): AuthResult {

		hashStr = hashStr.replace(/^#?\/?/, '');

		const result: AuthResult = {
			expiresAt: 0,
			nonce: undefined,
			state: undefined,
			idToken: undefined
		};

		if (hashStr.length > 0) {

			const tokens = hashStr.split('&');
			tokens.forEach(
				(token) => {
					const keyVal = token.split('=');
					switch (keyVal[0]) {
						case 'expiresAt': result.expiresAt = JSON.parse(keyVal[1]); break;
						case 'nonce': result.nonce = keyVal[1]; break;
						case 'state': result.state = keyVal[1]; break;
						case 'idToken': result.idToken = keyVal[1]; break;
						case 'tokenExchangeType': result.tokenExchangeType = keyVal[1]; break;
					}
				}
			);
		}
		return result;
	}
}
