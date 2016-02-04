var socket = io.connect("http://localhost:8080");

var pseudo_form = document.getElementById("pseudo_form");
var pseudo_input = document.getElementById("pseudo_input");

var chat = document.getElementById("chat");

var message_form = document.getElementById("message_form");
var message_input = document.getElementById("message_input");

function init()
{
	pseudo_input.focus();
}

function chat_append_element(elem)
{
	chat.appendChild(elem);
	chat.scrollTop = elem.offsetTop;
}

function chat_put_info(info)
{
	var p = document.createElement("p");
	p.className = "chat_info";
	p.innerHTML = info;
	chat_append_element(p);
}

function chat_put_message(pseudo, message, self)
{
	var message_bloc = document.createElement("div");
	if (self)
		message_bloc.className = "message_bloc self";
	else
		message_bloc.className = "message_bloc all";

	var message_container = document.createElement("div");
	message_container.className = "message";

	var message_pseudo = document.createElement("span");
	message_pseudo.className = "message_pseudo";
	message_pseudo.innerHTML = pseudo;

	var message_text = document.createElement("span");
	message_text.className = "message_text";
	message_text.innerHTML = message;

	message_bloc.appendChild(message_container);
	message_container.appendChild(message_pseudo);
	message_container.appendChild(message_text);
	chat_append_element(message_bloc);
}

function pseudo_form_submit()
{
	var pseudo = pseudo_input.value;
	if (pseudo != "")
		socket.emit("new_client", pseudo);
}

function message_form_submit()
{
	var message = message_input.value;
	if (message != "")
	{
		socket.emit("new_message", message);
		message_input.value = "";
		message_input.focus();
	}
}

socket.on("new_client", function(pseudo)
{
	chat_put_info("You joined the chat as " + pseudo + ".");
	message_input.focus();
});

socket.on("new_client_all", function(pseudo)
{
	chat_put_info(pseudo + " joined the chat.");
});

socket.on("new_message", function(pseudo, message)
{
	chat_put_message(pseudo, message, true);
});

socket.on("new_message_all", function(pseudo, message)
{
	chat_put_message(pseudo, message, false);
});

function send_message()
{
	var mes = document.getElementById("text_message").value;
	if (mes != "")
		socket.emit("message", mes);
}
