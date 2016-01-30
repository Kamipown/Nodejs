var http = require("http");
var url = require("url");
var querystring = require('querystring');

var server = http.createServer(function(req, res)
{
	var page = url.parse(req.url).pathname;
	var params = querystring.parse(url.parse(req.url).query);

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
			'	<body>');
		if ("name" in params)
			res.write(
			'		<p>Yo ' + params["name"] + ' !</p>');
		else
			res.write(
			'		<p>Yo !</p>');
		res.write(
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