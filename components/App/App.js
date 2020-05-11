import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

import io from "socket.io-client";

import MessageList from "../Messages/MessageList/MessageList.js";
import MessageForm from "../Messages/MessageForm/MessageForm.js";

import UserForm from "../Users/UserForm/UserForm.js";
import UserList from "../Users/UserList/UserList.js";
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
    	user: ''
    };
  }

  componentWillMount() {
	this.socket = io("http://localhost:3000");
	this.socket.on('connect', this.connect);
	this.socket.on('disconnect', this.disconnect);
	this.socket.on('messageAdded', this.onMessageAdded);
	this.socket.on('userJoined', this.onUserJoined);
  }

  onUserJoined = (users) => {
	this.setState({users:users });
  }

  onMessageAdded = (message) => {
	this.setState({messages: this.state.messages.concat(message)});
  }

  connect = () => {
  	this.setState({status: "Connected"});
  	console.log("Connected:", this.socket.id);
  }

  disconnect = (users) => {
  	this.setState({status: "Disconnected", users: users});
  }

  emit = (eventName, payload) => {
	
	this.socket.emit(eventName, payload);

  }

  setUser = (user) => {
	this.setState({user: user});
  }

  render() {
  	console.log(this.state.messages);
  	if (this.state.user == ''){
		
		return (
			<UserForm 
				emit={this.emit} 
				setUser={this.setUser}
			/>
		);
  	}
  	else {
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