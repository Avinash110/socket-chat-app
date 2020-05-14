const express = require("express");
const app = express();
const path = require('path');

const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const compiler = webpack(webpackConfig);
const mode = process.env.NODE_ENV || "development";

if(mode == "development"){
	app.use(require("webpack-dev-middleware")(compiler, {
	    noInfo: true, publicPath: webpackConfig.output.publicPath
	}));

	app.use(require("webpack-hot-middleware")(compiler));
}


const connections = [];
const users = [];

app.use(express.static(mode == "development" ? 'public' : 'build'));
app.get('/', function(req, res){
   res.redirect('/todo');
});

app.get('/favicon.ico', (req, res) => res.status(204));

const server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port+ " in "+ mode + " mode");
});

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

	socket.on('userTyping', (payload) => {
		const typingUser = {
			id: socket.id,
			user: payload.name
		};

		io.emit('userTyping', typingUser);
	});

});