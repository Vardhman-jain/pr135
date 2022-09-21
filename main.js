status = "";
objects = [];

function setup() {
    canvas = createCanvas(380, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 300);
    video.hide();
}

function start() {
    cocossd = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById('input').value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function draw() {
    image(video, 0, 0, 380, 300);
    if (status != "") {
        cocossd.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = 'Status:Obejcts Detected';
            document.getElementById("number_of_objects").innerHTML = "No. Of Objects Detected are: " + objects.length;

            fill('#EB1D36');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#EB1D36');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);


            if (objects[i].label == object_name) {
                video.stop();
                cocossd.detect(gotResult);
                document.getElementById('found').innerHTML = object_name + "Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            }else{
                document.getElementById('number_of_objects').innerHTML = object_name + "Not Found ";
            }
        }
    }

}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }
}