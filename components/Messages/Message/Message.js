import React from 'react';
import ReactDOM from 'react-dom';
import './Message.css';

import Moment from "moment";
export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  formatTime = (timeStamp) => {
  	return Moment(timeStamp).format("hh:mm A");
  }

  render() {
  	const {message} = this.props;
    return (
		<div className="message">
			<strong>{message.user}</strong> {this.formatTime(message.timeStamp)} - {message.text}
		</div>
    );
  }
}