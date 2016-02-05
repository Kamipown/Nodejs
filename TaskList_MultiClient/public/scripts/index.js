var socket = io.connect("http://localhost:8080");

var tasklist = document.getElementById("tasklist");

var task_form = document.getElementById("task_form");
var description_input = document.getElementById("description_input");
var priority_input = document.getElementById("priority_input");
var color_input = document.getElementById("color_input");

function init()
{
	description_input.focus();
}

function add_task_submit()
{
	var description = description_input.value;
	var priority = priority_input.value;
	var color = color_input.value;

	if (description != "" && priority >= 1 && priority <= 3)
		socket.emit("add_task", description, priority, color);
	description_input.value = "";
	priority_input.value = 2;
	color_input.value = "#2196f3";
	description_input.focus();
}

function delete_task_submit()
{
	socket.emit("delete_task", this.innerHTML);
}

socket.on("add_task", function(description, priority, date, color, n)
{
	var task_div = document.createElement("div");
	task_div.id = n;
	task_div.className = "task";
	task_div.style.borderLeft = "3px solid" + color;

		var description_div = document.createElement("div");
		description_div.className = "description";

			var description_p = document.createElement("p");
			description_p.innerHTML = description;

			var description_span = document.createElement("span");
			description_span.className = "n";
			description_span.innerHTML = n;
			description_span.onclick = delete_task_submit;

		var infos_div = document.createElement("div");
		infos_div.className = "infos";

			var priority_p_1 = document.createElement("p");
			priority_p_1.innerHTML = "Priority : ";

				var priority_span_1 = document.createElement("span");
				priority_span_1.innerHTML = priority;

			var priority_p_2 = document.createElement("p");
			priority_p_2.innerHTML = "Date : ";

				var priority_span_2 = document.createElement("span");
				priority_span_2.innerHTML = date;

	task_div.appendChild(description_div);
		description_div.appendChild(description_p);
		description_div.appendChild(description_span);
	task_div.appendChild(infos_div);
		infos_div.appendChild(priority_p_1);
			priority_p_1.appendChild(priority_span_1);
		infos_div.appendChild(priority_p_2);
			priority_p_2.appendChild(priority_span_2);

	tasklist.appendChild(task_div);
});

socket.on("delete_task", function(n)
{
	var tasks = document.getElementsByClassName("task");
	tasks[n].parentNode.removeChild(tasks[n]);

	var tasks_n = document.getElementsByClassName("n");
	var i = 0;
	while (i < tasks_n.length)
	{
		tasks_n[i].innerHTML = i;
		++i;
	}
});