import {
	ReceiveMessage,
	UpdateAlias,
	SendMessage
} from '../actions';

export function updateAlias (message) {
	return { type: UpdateAlias, message };
}

export function receiveMessage (message) {
	return { type: ReceiveMessage, message };
}

export function sendMessage (message) {
	return { type: SendMessage, message };
}