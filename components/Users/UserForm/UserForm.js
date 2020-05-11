import React from 'react';
import ReactDOM from 'react-dom';
import './UserForm.css';

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit = (event) => {
	event.preventDefault();
	const value = this.refs.name.value.trim();
	this.refs.name.value = "";

	this.props.setUser(value);
	this.props.emit('userJoined', {name: value});
  }

  render() {
    return (
    	<div className="col-md-8 offset-2">
    		<h3>Chat Login</h3>
    		<form onSubmit={this.onSubmit}>
				<input type="text" ref="name" placeholder="Enter your name : " className="form-control"/>
    		</form>
    	</div>
    );
  }
}