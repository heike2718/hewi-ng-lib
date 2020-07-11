export type TokenExchangeType = 'IMPLICITE_FLOW' | 'AUTHORIZATION_TOKEN_GRANT';

export interface AuthResult {
	expiresAt?: number;
	state?: string;
	nonce?: string;
	idToken: string;
	tokenExchangeType?: string;
}



