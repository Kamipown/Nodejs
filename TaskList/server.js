var express = require("express");
var session = require("cookie-session");
var body_parser = require("body-parser");

var url_encoded_parser = body_parser.urlencoded({extended: false});

var app = express();

app.use(express.static(__dirname + "/public"));

app.use(session({secret: "tasklist_secret"}));

app.use(function(req, res, next)
{
	if (typeof(req.session.tasklist) == "undefined")
	{
		req.session.tasklist = [];
	}
	next();
});

app.get("/", function(req, res)
{
	res.render("index.ejs", {tasklist: req.session.tasklist});
});

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

app.use(function(req, res, next)
{
	res.render("nopage.ejs");
});

app.listen(8080);
