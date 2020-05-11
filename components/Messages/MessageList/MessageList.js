import React from 'react';
import ReactDOM from 'react-dom';
import './MessageList.css';

import Message from "../Message/Message.js";

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return ( 
    	<div className="card card-body bg-light message-list">
    		<h3>Messages</h3>
    		{
    			this.props.messages.map((m, i) => {
    				return <Message message={m} key={i}></Message>
    			})
    		}
    	</div>
    );
  }
}