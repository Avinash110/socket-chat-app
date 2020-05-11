const express = require("express");
const app = express();

const connections = [];
const users = [];

app.use(express.static('./public'));

const server = app.listen(3000);

const io = require("socket.io").listen(server);

io.on('connection', (socket) => {
	connections.push(socket);
	console.log("Connected: %s socket con", connections.length);

	socket.once('disconnect', () => {
		for(var i=0; i < users.length; i++){
			if(users[i].id == socket.id){
				users.splice(i, 1);
			}
		}
		connections.splice(connections.indexOf(socket, 1));
		socket.disconnect();
		console.log("Socket Disconnected: ",connections.length);

		io.emit("disconnect", users);
	});

	socket.on('messageAdded', (payload) => {
		const newMessage = {
			timeStamp: payload.timeStamp,
			text: payload.text,
			user: payload.user
		};

		io.emit('messageAdded', newMessage);
	});

	socket.on('userJoined', (payload) => {
		const newUser = {
			id: socket.id,
			name: payload.name
		};

		users.push(newUser);

		io.emit('userJoined', users);
		console.log("User joined: ", newUser);
	});
});

console.log("Server listening on port 3000");