import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connect as socketConnect } from 'socket.io-client';

import {
	receiveMessage,
	sendMessage,
	updateAlias
} from './store/action/messengerAction';

import store from './store/store';
let hostAddress = location.host.split(':')[0],
	socket = socketConnect(`http://${hostAddress}:7015`);

socket.on('user-message', (message) => {
	store.dispatch(receiveMessage(message));
});

class Messenger extends Component {
	handleSubmit (event) {
		event.preventDefault();
		let content = this.refs.messengerInput.value,
			sender = this.refs.userAlias.value, message = {sender, content};

		// this.props.dispatch(sendMessage(message));
		this.refs.messengerInput.value = '';
		socket.emit('send-message', message);
	}

	renderMessages () {
		return this.props.messages.map((message, index) => {
			return <div className="message-line" key={index}>
				<div className="sender">{message.sender}:</div>
				<div className="message">{message.content}</div>
			</div>
		});
	}

	render() {
		return <div className="messenger-wrapper">
			<div className="alias">
				<input ref="userAlias" type="text" defaultValue={this.props.alias}></input>
			</div>
			<div className="messenger-messages">
				{this.renderMessages()}
			</div>
			<div className="messenger-pane">
				<form className="messenger-text" onSubmit={this.handleSubmit.bind(this)}>
					<input ref="messengerInput" className="messenger-input" type="text"/>
				</form>
			</div>
		</div>
	}
}

function mapStateToProps (state) {
	return {
		messages: state.messenger.get('messages'),
		alias: state.messenger.get('messengerAlias')
	}
}

export default connect(mapStateToProps)(Messenger);