exports.server_start = function()
{
	print_date();
	console.log("****************\n* Server start *\n****************\n")
}

exports.print_var = function(v, d)
{
	if (d)
		print_date();
	console.log(v + "\n");
}

function print_date()
{
	var date = new Date();
	var day, month, year;
	var hour, minute, second;

	year = date.getFullYear();
	(date.getMonth() < 9) ? (month = "0" + (date.getMonth() + 1)) : (month = (date.getMonth() + 1));
	(date.getDate() < 10) ? (day = "0" + date.getDate()) : (day = date.getDate());
	(date.getHours() < 10) ? (hour = "0" + date.getHours()) : (hour = date.getHours());
	(date.getMinutes() < 10) ? (minute = "0" + date.getMinutes()) : (minute = date.getMinutes());
	(date.getSeconds() < 10) ? (second = "0" + date.getSeconds()) : (second = date.getSeconds());

	console.log(day + "/" + month + "/" + year + " - " + hour + ":" + minute + ":" + second);
}