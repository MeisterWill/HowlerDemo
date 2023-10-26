"use strict";

import "/node_modules/howler/src/howler.core.js";

$("#major-chord-button").on("click", function () {
    playSound("majorchord.mp3")
}
);

function playSound(soundFileName) {
    var sound = new Howl({
        src: [`./mp3s/${soundFileName}`]
    })
    sound.play();
}

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

connection.on("ReceiveSound", function (soundFileName) {
    if (soundFileName != "Mario.mp3") {
        playSound(soundFileName);
    } else {
        var value = $("#client-mario-enable-check").is(":checked");
        if (value){
            playSound(soundFileName)
        }
    }
});

connection.start().then(function () {
    $("#send-message-button").attr("disabled", false);
    }
)

$("#send-message-button").on("click", function () {
    var message = $("#message-text-input").val()
    connection.invoke("SendMessage", message);
});

$("#stop-notifications-button").on("click", function () {
    var message = "StopHappyBirthday";
    connection.invoke("SendMessage", message);
})

$("#request-notification-button").on("click", function () {
    var message = "RequestSpaceMystery";
    connection.invoke("SendMessage", message);
})

