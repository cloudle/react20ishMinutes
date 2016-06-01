import express from 'express';
import {Server as httpServer} from 'http';
import io from 'socket.io';

let server = express(), http = httpServer(server), socketIo = io(http);

socketIo.set('origins', '*:*');
socketIo.on('connection', socket => {
	console.log('A user connected!');

	socket.on('disconnect', () => {
		console.log('A user disconnected..');
	});

	socket.on('send-message', message => {
		socketIo.emit('user-message', message);
	});
});

server.set('views', './www');
server.use(express.static('./www'));

server.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
});

server.get('/', (req, res) => {
	res.send('index.html');
});

var port = process.env.PORT || 7015;
http.listen(port, function(err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log(`Server is running under port: ${port}`);
});