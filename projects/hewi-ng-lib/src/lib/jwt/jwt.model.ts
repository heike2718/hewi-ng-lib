export const AUTH_STATE_SIGNUP = 'signup';
export const AUTH_STATE_LOGIN = 'login';
export const AUTH_STATE_EMPTY = 'empty';

export const STORAGE_KEY_JWT = 'id_token';
export const STORAGE_KEY_EXPIRES_AT = 'expires_at';
export const STORAGE_KEY_AUTH_STATE = 'auth_state';
export const STORAGE_KEY_REFRESH_TOKEN = 'refresh_token';


export interface AuthResult {
	accessToken?: string;
	refreshToken?: string;
	expiresAt?: number;
	tokenType?: string;
	state: string;
	idToken?: string;
}



