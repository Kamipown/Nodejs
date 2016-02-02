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

		new_task.description = req.body.task_description;
		new_task.priority = req.body.task_priority;
		new_task.color = req.body.task_color;
		req.session.tasklist.push(new_task);
	}
	res.redirect("/");
});

/*
app.post("/delete/:id", function(req, res)
{

	res.redirect("/");
});
*/

app.use(function(req, res, next)
{
	res.render("nopage.ejs");
});

app.listen(8080);
