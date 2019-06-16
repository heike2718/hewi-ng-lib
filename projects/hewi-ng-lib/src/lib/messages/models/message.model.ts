/**
 * These objects are used for any communication with the server.
 * The ResponsePayload includes a Message object and an arbitrary payload containing the business data.
 *
 * The HateoasPayload contains information about resources available.
 */
export const INFO = 'INFO';
export const WARN = 'WARN';
export const ERROR = 'ERROR';

export interface Message {

	level: string;
	message: string;
}

export interface HateoasLink {
	url: string;
	rel: string;
	method: string;
	mediaType: string;
}

export interface HateoasPayload {
	id: string;
	url: string;
	links: HateoasLink[];
}


export interface ResponsePayload {
	message: Message;
	data?: any;
}

