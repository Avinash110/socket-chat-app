import React from 'react';
import ReactDOM from 'react-dom';
import './MessageForm.css';
import _ from "underscore";

export default class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
	
  onSubmit = (event) => {
	event.preventDefault();
	this.props.emit('messageAdded', {
		timeStamp: Date.now(),
		text: this.refs.message.value.trim(),
		user: this.props.user
	});

	this.refs.message.value = "";
  }

  onKeyUp = (event) => {
  	if (this.clearUserTypingWrapper){
  		this.clearUserTypingWrapper.cancel();
  	}
  	this.callUserTypingWrapper = _.debounce(this.callUserTyping, 500);
  	this.callUserTypingWrapper();
  	this.clearUserTypingWrapper = _.debounce(this.clearUserTyping, 2000);
  	this.clearUserTypingWrapper();
  }

  clearUserTyping = () => {
  	this.props.emit('userTyping', {
		name: ''
	});
  }

  callUserTyping = () => {
  	this.props.emit('userTyping', {
		name: this.props.user
	});
  }

  render() {
    return (
		<form onSubmit={this.onSubmit}>
			<input onKeyUp={this.onKeyUp} type="text" ref="message" placeholder="Please type a message..." className="form-control"/>
		</form>
    );
  }
}