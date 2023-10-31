import "/node_modules/howler/src/howler.core.js";

$("#major-chord-button").on("click", function () {
    playSound("majorchord.mp3")
}
);

const soundMap = new Map(); 

function playSound(soundFileName) {

    if (!soundMap.has(soundFileName)) {
        var sound = new Howl({
            src: [`./mp3s/${soundFileName}`]
        })
        soundMap.set(soundFileName, sound);
    }

    soundMap.get(soundFileName).play();
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

connection.on("ReceiveSound", function (parameters) {
    if (parameters.message != "Mario.mp3") {
        playSound(parameters.message);
    } else {
        var value = $("#client-mario-enable-check").is(":checked");
        if (value){
            playSound(parameters.message)
        }
    }
});

connection.start().then(function () {
    $("#send-message-button").attr("disabled", false);
});

//Send Message
$("#send-message-button").on("click", function () {
    var message = $("#message-text-input").val();
    var parameters = { message: message }
    connection.invoke("SendMessage", parameters);
});

//Happy Birthday Card
$("#stop-happy-birthday-button").on("click", function () {
    var message = "StopHappyBirthday";
    var parameters = { message: message }
    connection.invoke("SendMessage", parameters);
})


//Space Mystery Card
$("#request-space-mystery-button").on("click", function () {
    var message = "RequestSpaceMystery";
    var parameters = {message: message}
    connection.invoke("SendMessage", parameters);
})

//Play Pause Stop handling
soundMap.set("HappyDay.mp3",
    new Howl({
        src: [`/mp3s/HappyDay.mp3`],
        onend: function () { ResetHappyDay(); }
    }));
function ResetHappyDay() {
    soundMap.get("HappyDay.mp3").stop();
    $("#pps-play-button").attr("disabled", false);
    $("#pps-pause-button").attr("disabled", true);
    $("#pps-stop-button").attr("disabled", true);
}

$("#pps-play-button").on("click", function () {
    soundMap.get("HappyDay.mp3").play();
    $("#pps-play-button").attr("disabled", true);
    $("#pps-pause-button").attr("disabled", false);
    $("#pps-stop-button").attr("disabled", false);
});

$("#pps-pause-button").on("click", function () {
    soundMap.get("HappyDay.mp3").pause();
    $("#pps-play-button").attr("disabled", false);
    $("#pps-pause-button").attr("disabled", true);
    $("#pps-stop-button").attr("disabled", false);
});

$("#pps-stop-button").on("click", function () {
    soundMap.get("HappyDay.mp3").pause();
    ResetHappyDay();
});

$("#pps-volume-range").on("input", function () {
    soundMap.get("HappyDay.mp3").volume($("#pps-volume-range").val() / 100.0); //Divide by 100 to get to percent instead of integer
});

//Sound Scheduling
$("#scheduling-add-button").on("click", function () {
    var soundFileName = $("#scheduling-filename-input").val()
    var interval = $("#scheduling-interval-input").val()
    var parameters = {message: soundFileName, number: interval}
    connection.invoke("SendAddTimedSound", parameters);

    var li = document.createElement("li");
    li.textContent = `${soundFileName} every ${interval} seconds`
    $("#scheduling-list").append(li);
})
