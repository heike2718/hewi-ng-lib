export const STORAGE_KEY_JWT = 'jwt';
export const STORAGE_KEY_JWT_EXPIRES_AT = 'jwt_exp';
export const STORAGE_KEY_JWT_STATE = 'jwt_state';
export const STORAGE_KEY_JWT_REFRESH_TOKEN = 'jwt_rt';
export const STORAGE_KEY_JWT_ACCESS_TOKEN = 'jwt_at';


export interface AuthResult {
	accessToken?: string;
	refreshToken?: string;
	expiresAt?: number;
	tokenType?: string;
	state?: string;
	idToken?: string;
}



