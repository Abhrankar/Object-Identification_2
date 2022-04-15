img = "";
status_ = "";
objects = [];

function preload() {
    img = loadImage('4-objects.jpg');
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status_ != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[1].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

        document.getElementById("status").innerHTML = "Status: Objects Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
    }

    /*text("Cat", 300, 40);
    noFill();
    stroke("#FF0000");
    rect(300, 30, 200, 350);

    fill("#FF0000");
    text("Kitten", 31, 100);
    noFill();
    stroke("#FF0000");
    rect(30, 90, 270, 320);
    */
}

function modelLoaded() {
    console.log("Model Loaded!");
    status_ = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}