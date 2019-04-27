/**
 * These objects are used for any communication with the server.
 * The ResponsePayload includes a Message object and an arbitrary payload containing the business data.
 */
export const INFO = 'INFO';
export const WARN = 'WARN';
export const ERROR = 'ERROR';

export interface Message {

    level: string;
    message: string;
}


export interface ResponsePayload {
    message: Message;
    data?: any;
}

