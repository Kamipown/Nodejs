var express = require("express");

var app = express();

app.get("/", function(req, res)
{
	res.setHeader("Content-Type", "text/html");
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
});

app.get("/:page_name", function(req, res)
{
	res.setHeader("Content-Type", "text/html");
	res.write(
		'<!DOCTYPE html>'+
		'<html>'+
		'	<head>'+
		'		<meta charset="utf-8" />'+
		'		<title>Yo</title>'+
		'	</head>'+
		'	<body>'+
		'		<p>Yo !</p>'+
		'		<p>You are on the page ' + req.params.page_name + '.</p>'+
		'	</body>'+
		'</html>');
	res.end();
});

app.use(function(req, res, next)
{
	res.setHeader("Content-Type", "text/html");
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
});

app.listen(8080);
