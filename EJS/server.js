var express = require("express");

var app = express();

app.get("/", function(req, res)
{
	res.render("index.ejs");
});

app.get("/:number", function(req, res)
{
	res.render("number.ejs", {number: req.params.number});
});

app.use(function(req, res, next)
{
	res.render("nopage.ejs");
});

app.listen(8080);
