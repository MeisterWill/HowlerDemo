import { signalR } from "./signalr/dist/browser/signalr"

var connection = new signalR.HubConnectionBulder().withUrl("/messageHub").build(); //Create a connection object for the /messageHub endpoint

document.getElementById("send-message-button").disabled = true;

connection.on("ReceiveMessage", function (message) {
    var li = document.createElement("li");
    li.textContent = message
    $("#messages-list").appendChild(li);
});

connection.start()
document.getElementById("send-message-button").on("onClick", function () {
    connection.on("click", function () {
        var text = $("#message-text-input").textContent
        connection.invoke("SendMessage", text)
    })
});

