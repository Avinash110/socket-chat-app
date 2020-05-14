import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import io from "socket.io-client";

import MessageList from "../Messages/MessageList/MessageList.js";
import MessageForm from "../Messages/MessageForm/MessageForm.js";

import UserForm from "../Users/UserForm/UserForm.js";
import UserList from "../Users/UserList/UserList.js";

const eventToFunctionMapping = [
	{'event': 'connect', 'function': 'connect'},
	{'event': 'disconnect', 'function': 'disconnect'},
	{'event': 'messageAdded', 'function': 'onMessageAdded'},
	{'event': 'userJoined', 'function': 'onUserJoined'},
	{'event': 'userTyping', 'function': 'userTyping'}
];
export default class App extends React.Component {
		constructor(props) {
				super(props);
				this.state = {
						status: "Disconnected",
						messages: [{
								timeStamp: Date.now(),
								text: "Welcome to Socket Chat"
						}],
						users: [],
						user: '',
						userTyping: ''
				};
		}

		componentWillMount() {
				this.socket = io(location.origin);

				eventToFunctionMapping.forEach((element, index) => {
					this.socket.on(element.event, this[element.function]);
				});
		}

		userTyping = (payload) => {
				this.setState({userTypingId: payload.id, userTyping: payload.user});
		}

		onUserJoined = (users) => {
				this.setState({ users: users });
		}

		onMessageAdded = (message) => {
				this.setState({ messages: this.state.messages.concat(message) });
		}

		connect = () => {
				this.setState({ status: "Connected" });
				console.log("Connected:", this.socket.id);
		}

		disconnect = (users) => {
				this.setState({ status: "Disconnected", users: users });
		}

		emit = (eventName, payload) => {
				this.socket.emit(eventName, payload);
		}

		setUser = (user) => {
				this.setState({ user: user });
		}

		render() {
				if (this.state.user == '') {
						return (
								<UserForm 
									emit={this.emit} 
									setUser={this.setUser}
								/>
						);
				} else {
						return (
								<div className="row">
									<div className="col-md-4 offset-md-1">
										<UserList 
											{...this.state}
										/>
									</div>
									<div className="col-md-6">
										<MessageList 
											{...this.state}
										/>
										<span className="current-user-typing">{this.state.userTypingId != this.socket.id && this.state.userTyping ? this.state.userTyping + " is typing ..." : ""} </span>
										<MessageForm
											emit={this.emit}
											{...this.state}
										/>
									</div>
								</div>
						);
				}
		}
}