"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/messageHub").build(); //Create a connection object for the /messageHub endpoint

$("#send-message-button").attr("disabled", true);

var test = document.createElement("li");
document.getElementById("message-list").append(test);
test.textContent = "Initial Test Message";


connection.on("ReceiveMessage", function (message) {
    var li = document.createElement("li");
    $("#message-list").append(li);
    li.textContent = `${message}`;
});

connection.start().then(function () {
    $("#send-message-button").attr("disabled", false);
    }
)

$("#send-message-button").on("click", function () {
    var message = $("#message-text-input").val()
    connection.invoke("SendMessage", message);
});

