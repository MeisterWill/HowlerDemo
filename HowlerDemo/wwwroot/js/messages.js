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

$("#stop-happy-birthday-button").on("click", function () {
    var message = "StopHappyBirthday";
    connection.invoke("SendMessage", message);
})

$("#request-space-mystery-button").on("click", function () {
    var message = "RequestSpaceMystery";
    connection.invoke("SendMessage", message);
})

//Play Pause Stop handling
var HappyDay = "Not Set"
function ResetHappyDay() {
    HappyDay = new Howl({
        src: [`/mp3s/HappyDay.mp3`],
        onend: function () { ResetHappyDay(); }
    });
    $("#pps-play-button").attr("disabled", false);
    $("#pps-pause-button").attr("disabled", true);
    $("#pps-stop-button").attr("disabled", true);
}

ResetHappyDay();

$("#pps-play-button").on("click", function () {
    HappyDay.play();
    $("#pps-play-button").attr("disabled", true);
    $("#pps-pause-button").attr("disabled", false);
    $("#pps-stop-button").attr("disabled", false);
});

$("#pps-pause-button").on("click", function () {
    HappyDay.pause();
    $("#pps-play-button").attr("disabled", false);
    $("#pps-pause-button").attr("disabled", true);
    $("#pps-stop-button").attr("disabled", false);
});

$("#pps-stop-button").on("click", function () {
    HappyDay.pause();
    ResetHappyDay();
});

$("#pps-volume-range").on("input", function () {
    HappyDay.volume($("#pps-volume-range").val() / 100.0) //Divide by 100 to get to percent instead of integer
});
