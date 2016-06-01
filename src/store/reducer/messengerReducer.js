import Immutable from 'immutable';

import {
	ReceiveMessage,
	UpdateAlias,
	SendMessage
} from '../actions';

const defaultState = Immutable.Map({
	messages: [],
	messengerAlias: 'Anonymous'
});

export default function (state = defaultState, action) {
	switch (action.type) {
		case ReceiveMessage:
			return state.set('messages', [...state.get('messages'), action.message]);
		case SendMessage:
			return state.set('messages', [...state.get('messages'), action.message]);
		case UpdateAlias:
			return state.set('messengerAlias', action.alias);
		default:
			return state;
	}
}