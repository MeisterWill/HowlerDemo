import "/node_modules/howler/src/howler.core.js";

//Add handlers on controls
$("#major-chord-button").on("click", playMajorChord);


//Create handler functions
function playMajorChord() {
    var majorChord = new Howl({
        src: ['./mp3s/majorchord.mp3']
    });
    majorChord.play();
}