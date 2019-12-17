export interface AuthResult {
	expiresAt?: number;
	state?: string;
	nonce?: string;
	idToken: string;
}



