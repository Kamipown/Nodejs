var express = require("express");
var app = express();
var server = app.listen(8080);
var io = require("socket.io").listen(server);
var fs = require("fs");

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res)
{
	fs.readFile("./index.html", "utf-8", function(error, content)
	{
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(content);
	});
});

io.sockets.on("connection", function(socket, pseudo)
{
	socket.on("new_client", function(pseudo)
	{
		if (pseudo != "")
		{	
			socket.pseudo = pseudo;
			socket.emit("new_client", pseudo);
			socket.broadcast.emit("new_client_all", pseudo);
		}
	});

	socket.on("new_message", function(message)
	{
		if (socket.pseudo)
		{
			socket.emit("new_message", socket.pseudo, message);
			socket.broadcast.emit("new_message_all", socket.pseudo, message);
		}
	});

	socket.on("message", function(message)
	{
		console.log(message);
	});
});
