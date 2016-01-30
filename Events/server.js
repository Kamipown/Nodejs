var http = require("http");
var url = require("url");
var EventEmitter = require('events').EventEmitter;

var users = new EventEmitter();

users.on("connect", function(name)
{
	console.log(name + " connected.");
});

var server = http.createServer(function(req, res)
{
	var page = url.parse(req.url).pathname;
	if (page == "/")
	{
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write(
			'<!DOCTYPE html>'+
			'<html>'+
			'	<head>'+
			'		<meta charset="utf-8" />'+
			'		<title>Yo</title>'+
			'	</head>'+
			'	<body>'+
			'		<p>Yo !</p>'+
			'	</body>'+
			'</html>');
		res.end();
	}
	else
	{
		res.writeHead(404, {"Content-Type": "text/html"});
		res.write(
			'<!DOCTYPE html>'+
			'<html>'+
			'	<head>'+
			'		<meta charset="utf-8" />'+
			'		<title>Yo</title>'+
			'	</head>'+
			'	<body>'+
			'		<p>404 not found !</p>'+
			'	</body>'+
			'</html>');
		res.end();
	}

	users.emit("connect", "Kamipown");
});
server.listen(8080);