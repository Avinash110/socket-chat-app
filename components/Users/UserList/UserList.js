import React from 'react';
import ReactDOM from 'react-dom';
import './UserList.css';

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
		<div>
			<h3>Users {this.props.users.length}</h3>
			<ul className="list-group">
				{
					this.props.users.map((user, index) => {
						return <li className="list-group-item" key={index} user={user}>{user.name}</li>
					})
				}
			</ul>
		</div>
    );
  }
}