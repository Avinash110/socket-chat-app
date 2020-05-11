import React from 'react';
import ReactDOM from 'react-dom';
import './MessageForm.css';

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

  render() {
    return (
		<form onSubmit={this.onSubmit}>
			<input type="text" ref="message" placeholder="Please type a message..." className="form-control"/>
		</form>
    );
  }
}