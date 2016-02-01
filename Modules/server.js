var http = require("http");
var url = require("url");
var debug = require("./modules/debug");

debug.server_start();

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
});
server.listen(8080);