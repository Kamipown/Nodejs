var express = require("express");
var app = express();
var server = app.listen(8080);
var io = require("socket.io").listen(server);
var fs = require("fs");

var tasklist = [];

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res)
{
	fs.readFile("./index.html", "utf-8", function(error, content)
	{
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(content);
	});
});

app.use(function(req, res, next)
{
	fs.readFile("./nopage.html", "utf-8", function(error, content)
	{
		res.writeHead(404, {"Content-Type": "text/html"});
		res.end(content);
	});
});

io.sockets.on("connection", function(socket)
{
	var i = 0;
	while (i < tasklist.length)
	{
		socket.emit("add_task", tasklist[i].description, tasklist[i].priority, tasklist[i].date, tasklist[i].color, i);
		++i;
	}

	socket.on("add_task", function(description, priority, color)
	{
		if (description != "")
		{	
			var new_task = new Object();

			var date = new Date();
			var day, month, year;
			var hour, minute, second;

			year = date.getFullYear();
			(date.getMonth() < 9) ? (month = "0" + (date.getMonth() + 1)) : (month = (date.getMonth() + 1));
			(date.getDate() < 10) ? (day = "0" + date.getDate()) : (day = date.getDate());
			(date.getHours() < 10) ? (hour = "0" + date.getHours()) : (hour = date.getHours());
			(date.getMinutes() < 10) ? (minute = "0" + date.getMinutes()) : (minute = date.getMinutes());
			(date.getSeconds() < 10) ? (second = "0" + date.getSeconds()) : (second = date.getSeconds());

			new_task.description = description;
			if (priority == 1)
				new_task.priority = "Low";
			else if (priority == 3)
				new_task.priority = "High";
			else
				new_task.priority = "Medium";
			new_task.date = day + "/" + month + "/" + year + " - " + hour + ":" + minute + ":" + second;
			new_task.color = color;
			new_task.n = tasklist.length;

			socket.emit("add_task", new_task.description, new_task.priority, new_task.date, new_task.color, new_task.n);
			socket.broadcast.emit("add_task", new_task.description, new_task.priority, new_task.date, new_task.color, new_task.n);
			tasklist.push(new_task);
		}
	});

	socket.on("delete_task", function(n)
	{
		tasklist.splice(n, 1);
		socket.emit("delete_task", n);
		socket.broadcast.emit("delete_task", n);
	});
});


/*
app.post("/add", url_encoded_parser, function(req, res)
{
	if (req.body.task_description != "")
	{
		var new_task = new Object();

		var date = new Date();
		var day, month, year;
		var hour, minute, second;

		year = date.getFullYear();
		(date.getMonth() < 9) ? (month = "0" + (date.getMonth() + 1)) : (month = (date.getMonth() + 1));
		(date.getDate() < 10) ? (day = "0" + date.getDate()) : (day = date.getDate());
		(date.getHours() < 10) ? (hour = "0" + date.getHours()) : (hour = date.getHours());
		(date.getMinutes() < 10) ? (minute = "0" + date.getMinutes()) : (minute = date.getMinutes());
		(date.getSeconds() < 10) ? (second = "0" + date.getSeconds()) : (second = date.getSeconds());

		new_task.description = req.body.task_description;
		new_task.priority = req.body.task_priority;
		new_task.color = req.body.task_color;
		new_task.date = day + "/" + month + "/" + year + " - " + hour + ":" + minute + ":" + second;
		req.session.tasklist.push(new_task);
	}
	res.redirect("/");
});

app.get("/delete/:id", function(req, res)
{
	var n = req.params.id;
	if (n != "")
		req.session.tasklist.splice(n, 1);
	res.redirect("/");
});
*/